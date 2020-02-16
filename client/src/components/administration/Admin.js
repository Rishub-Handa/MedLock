import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { fetchAMT } from '../../auth/AuthManagement'; 
import { auth0Registration, assignRoles } from '../../actions/authActions'; 
import { createProviderProfile, fetchAllProviders, deleteProvider } from '../../actions/providerActions'; 
import { fetchAllPatients, deletePatient } from '../../actions/patientActions';
import { MEDLOCK_API } from '../../config/servers';
import PatientSection from './sections/patients/PatientSection';
import axios from 'axios';
import ProviderSection from './sections/providers/ProviderSection';
import ClinicSection from './sections/clinics/ClinicSection';
import PropTypes from 'prop-types';
import { fetchAllClinics } from '../../actions/clinicActions';
import '../../css/Admin.css';

class Admin extends Component {
    
    clinics = [{"name": "clinic1"}, {"name": "clinic2"}]
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllPatients();
        this.props.fetchAllProviders();
        this.props.fetchAllClinics();
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value 
        });
        console.log(this.state);
    }

    createNewProvider = (name, email) => {
        fetchAMT() 
            .then(res => {
                console.log(res); 
                const AMT = res.data.access_token; 
                
                const password = Math.random().toString(36).slice(-12); 

                const newProvider = {
                    "name": name, 
                    "email": email,
                    "password": password,
                    "connection": "Username-Password-Authentication"
                };

                // Create New Provider in Auth0 
                this.props.auth0Registration(newProvider, AMT) 
                    .then(() => {
                        // Send Temporary Password 
                        this.newProviderEmail(newProvider); 

                        // Create New Provider in MongoDB 
                        const user_id = this.props.userProfile.user_id; 
                        this.props.createProviderProfile({
                            _id: user_id.substring(6), 
                            personalData: {
                                name, 
                                email,
                            }
                        // Eventually create administrator roles and query user roles. 
                        }, "Admin"); 

                        // Assign Provider Role to New User 
                        this.props.assignRoles(user_id, AMT, "Provider"); 


                    }) 
                    .catch(error => console.log(error)); 
            }) 
            .catch(error => console.log(error)); 
    }

    newProviderEmail = (newProvider) => {
        var url = `${MEDLOCK_API}/email`;
        axios.post(url, newProvider); 
    }

    deleteAllProviders = () => {

        // var url = `${MEDLOCK_API}/admin/provider`;
        const ids = this.props.providers.map(provider => provider._id);
        this.props.deleteProvider(ids);
    }

    deletePatient = (patientId) => {
        this.props.deletePatient([patientId]);
    }

    deleteProvider = (providerId) => {
        this.props.deleteProvider([providerId]);
    }

    deleteAllPatients = () => {
        // var url = `${MEDLOCK_API}/admin/patient`;
        const ids = this.props.patients.map(patient => patient._id);
        this.props.deletePatient(ids);
    }

    registerClinic = (clinicName) => {
        console.log("registerClinic() called");
        this.props.registerClinic();
    }

    render() {
        const { patients, 
                patientsFetching, 
                patientsFetched, 
                fetchPatientsError,
                providers,
                providersFetching,
                providersFetched,
                fetchProvidersError,
                clinicsFetching,
                fetchClinicsError,
            } = this.props;

        if (fetchProvidersError || fetchPatientsError || fetchClinicsError) {
            return (
                <div>
                    PROVIDER: ${fetchProvidersError}
                    PATIENT: ${fetchPatientsError}
                </div>
            );
        }

        if (providersFetching || patientsFetching || clinicsFetching) {
            return (
                <div> Loading . . .</div>
            );
        } 

            return (
                <div>
                    <div className="Admin-header">
                        <h1 className="header">MedLock Admin</h1>
                    </div>
                    <div className="Admin-content">
                            <PatientSection 
                                patients={patients}
                                deletePatient={this.deletePatient}
                                deleteAllPatients={this.deleteAllPatients}
                            />
                            <ProviderSection 
                                providers={providers}
                                createNewProvider={this.createNewProvider}
                                deleteProvider={this.deleteProvider}
                                deleteAllProviders={this.deleteAllProviders} 
                            />
                            <ClinicSection 
                                clinics={this.props.clinics}
                                registerClinic={this.registerClinic}
                            />
                    </div>
                </div>
            );
        
    }
} 

Admin.propTypes = {
    userProfile: PropTypes.object.isRequired,

    fetchAllPatients: PropTypes.func.isRequired,
    patients: PropTypes.array.isRequired,
    patientsFetching: PropTypes.bool.isRequired,
    patientsFetched: PropTypes.bool.isRequired,
    fetchPatientsError: PropTypes.object,

    fetchAllProviders: PropTypes.func.isRequired,
    providers: PropTypes.array.isRequired,
    providersFetching: PropTypes.bool.isRequired,
    providersFetched: PropTypes.bool.isRequired,
    fetchProvidersError: PropTypes.object,

    deleteProvider: PropTypes.func.isRequired,
    deletedProviders: PropTypes.array.isRequired,

    deletePatient: PropTypes.func.isRequired,
    deletedPatients: PropTypes.array.isRequired,

    clinicsFetching: PropTypes.bool.isRequired,
    clinicsFetched: PropTypes.bool.isRequired,
    fetchClinicsError: PropTypes.object,
    clinics: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    userProfile: state.authState.userProfile,

    patients: state.patientState.patients,
    patientsFetching: state.patientState.patientsFetching,
    patientsFetched: state.patientState.patientsFetched,
    fetchPatientsError: state.patientState.fetchPatientsError,

    providers: state.providerState.providers,
    providersFetching: state.providerState.providersFetching,
    providersFetched: state.providerState.providersFetched,
    fetchProvidersError: state.providerState.providerError, 

    deletedProviders: state.providerState.deletedProviders,
    deletedPatients: state.patientState.deletedPatients, 

    clinicsFetching: state.clinicState.clinicsFetching,
    clinicsFetched: state.clinicState.clinicsFetched,
    fetchClinicsError: state.clinicState.clinicsError,
    clinics: state.clinicState.clinics,
});

export default connect(mapStateToProps, { 
    auth0Registration, 
    createProviderProfile, 
    assignRoles, 
    fetchAllPatients, 
    fetchAllProviders,
    deleteProvider,
    deletePatient,
    fetchAllClinics,
})(Admin); 