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

    createNewProvider = (e) => {
        e.preventDefault(); 

        fetchAMT() 
            .then(res => {
                console.log(res); 
                const AMT = res.data.access_token; 
                
                const password = Math.random().toString(36).slice(-12); 

                const newProvider = {
                    "name": this.state.name, 
                    "email": this.state.email,
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
                                name: this.state.name, 
                                email: this.state.email 
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
        axios.delete(url)
            .then(console.log("All Providers Deleted Successfully"))
            .catch(err => console.log(err));
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

    createNewProviderForm = () => {
        return (
            <Form>
                <FormGroup>
                    <Label for="newProviderName">Name</Label>
                    <Input 
                        type="text" 
                        name="newProviderName" 
                        id="newProviderName"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="newProviderEmail">Email</Label>
                    <Input 
                        type="text" 
                        name="newProviderEmail" 
                        id="newProviderEmail"
                        onChange={this.onChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.createNewProvider}>Create</Button>
                </FormGroup>
            </Form>
        )
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
                    <h1>Administration</h1>
                    <div>
                        <h1>Create New Provider</h1>
                        {this.createNewProviderForm()}
                    </div>
                    <div>
                        <h1>DANGER ZONE</h1>
                        <button onClick={this.deleteAllProviders}>DELETE ALL PROVIDERS</button>
                    </div>
                    <div>
                        <form>
                            <label>
                                User ID To Delete:
                                <input type="text" name="_id" onChange={this.onChange} />
                            </label>
                            {/* <button onClick={this.deletePatient}>DELETE PATIENT</button> */}
                        </form>
                        <button onClick={() => this.deletePatient(this.state._id)}>DELETE SPECIFIED PATIENT</button>
                    </div>
                    <div>
                    <button onClick={this.deleteAllPatients}>DELETE ALL PATIENTS</button>
                    </div>
                    <div>
                        <PatientSection patients={patients}/>
                        <ProviderSection providers={providers} />
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