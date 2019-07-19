import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import { fetchAMT } from '../../auth/AuthManagement'; 
import { auth0Registration, assignRoles } from '../../actions/authActions'; 
import { createProviderProfile, fetchAllProviders } from '../../actions/providerActions'; 
import { fetchAllPatients } from '../../actions/patientActions';
import { MEDLOCK_API } from '../../config/servers';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PatientSection from './sections/patients/PatientSection';

import axios from 'axios';
import ProviderSection from './sections/providers/ProviderSection';
import PropTypes from 'prop-types';
import '../../css/Admin.css';

class Admin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllPatients();
        this.props.fetchAllProviders();
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
        var url = `${MEDLOCK_API}/admin/provider`;
        const ids = this.props.providers.map(provider => provider._id);
        fetchAMT()
            .then(res => {
                const AMT = res.data.access_token;
                axios.delete(url, {
                    data: {
                        AMT,
                        ids, 
                    }
                })
                .then(console.log("All Providers Deleted Successfully"))
                .catch(err => console.log(err));
            });
    }

    deletePatient = (patientId) => {
        console.log(patientId);
        var url = `${MEDLOCK_API}/admin/patient?_id=${patientId}`;
        fetchAMT()
            .then(res => {
                const AMT = res.data.access_token; 
                axios.delete(url, {
                    data: {
                        AMT,
                        deleteAll: false,
                    }
                })
                    .then(alert(`Patient ${patientId} deleted successfully`))
                    .catch(err => alert(`Error On Delete: ${err}`));
            });            
    }

    deleteAllPatients = () => {
        var url = `${MEDLOCK_API}/admin/patient?_id=0`;
        axios.delete(url, {
            data: {
                deleteAll: true,
            }
        })
            .then(alert(`All patients deleted successfully`))
            .catch(err => alert(`Error On Delete: ${err}`));
    }

    render() {
        console.log(this.props);
        const { patients, 
                patientsFetching, 
                patientsFetched, 
                fetchPatientsError,
                providers,
                providersFetching,
                providersFetched,
                fetchProvidersError
            } = this.props;

        
        if (fetchProvidersError || fetchPatientsError) {
            return (
                <div>
                    PROVIDER: ${fetchProvidersError}
                    PATIENT: ${fetchPatientsError}
                </div>
            );
        }

        if (providersFetching || patientsFetching) {
            return (
                <div> Loading . . .</div>
            );
        } 

            return (
                <div>
                    <h1>MedLock Admin Page</h1>
                    <div className="Admin-content">
                        <div className="leftPanel">
                            <PatientSection 
                                patients={patients}
                                deletePatient={this.deletePatient}
                                deleteAllPatients={this.deleteAllPatients}
                            />
                        </div>
                        <div className="rightPanel">
                            <ProviderSection 
                                providers={providers}
                                createNewProvider={this.createNewProvider}
                                deleteAllProviders={this.deleteAllProviders} 
                            />
                        </div>
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
    fetchProvidersError: state.providerState.providerError
});

export default connect(mapStateToProps, { 
    auth0Registration, 
    createProviderProfile, 
    assignRoles, 
    fetchAllPatients, 
    fetchAllProviders
})(Admin); 