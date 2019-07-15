import React, { Component } from 'react';
import PatientList from './PatientList';
import AddPatientForm from './AddPatientForm';
import { fetchAMT, getUserByEmail } from '../../auth/AuthManagement'; 
import { auth0Registration, assignRoles } from '../../actions/authActions';
import { createPatientProfile, addPatientToProviderList, fetchPatients } from '../../actions/patientActions'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import auth0client from '../../auth/Auth'; 
import PatientView from '../patientView/PatientView';
import SearchField from 'react-search-field';

const axios = require('axios'); 

class MyPatients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPatientForm: false,
            onePatientView: false,
            displayedPatients: this.props.patients,
            viewedPatient: null
        }
    }

    viewPatient = (patient) => {
        this.setState({
            onePatientView: true,
            viewedPatient: patient
        });
        this.props.history.push("/dashboard/mypatients/viewpatient");
    }

    addPatient = () => {
        this.setState({newPatientForm: true});
    }

    displayNewPatientForm = () => {
        const { newPatientForm } = this.state;
        if (newPatientForm) {
            return (
                <div>
                    <AddPatientForm onSubmit={this.submitForm} />
                </div>
            );
        }
        
        else {
            return (
                <div>
                    <Button onClick={this.addPatient}>Register Patient</Button>
                </div>
            )
        }
    }

    submitForm = (name, email) => {

        const password = Math.random().toString(36).slice(-12); 

        const newPatient = {
            "name": name, 
            "email": email,
            "password": password,
            "connection": "Username-Password-Authentication"
        };
            

        fetchAMT() 
            .then(res => {

                const AMT = res.data.access_token; 

                this.props.auth0Registration(newPatient, AMT)
                    .then(() => { 
                        this.createPatient(newPatient, AMT, this.props.userProfile.user_id);
                    })
                    .catch(error => {
                        console.log(`User Registration Error: ${error}`); 
                        const errorString = `${error}`; 
                        console.log(errorString.includes("409")); 
                    
                        if(errorString.includes("409")) {
                            getUserByEmail(email, AMT) 
                                .then(res => {
                                    const user_id = res.data[0].user_id; 
                                    console.log(user_id); 

                                    const newPatientProfile = {
                                        _id: user_id.substring(6),
                                        personalData: {
                                            name: name,
                                            email: email,
                                        },
                                        medicalData: {
                                            providers: [auth0client.userProfile.sub.substring(6)]
                                        }
                                    };

                                    this.props.createPatientProfile(newPatientProfile)
                                        .then(() => {
                                            console.log("successful");
                                            this.props.fetchPatients();
                                        })
                                })
                            }
                    });
                }) 
                .catch(error => console.log(error));

        this.setState({ newPatientForm: false });
    }

    createPatient = (newPatient, AMT, patient_id) => {
        console.log("Patient registered. Now creating profile . . . "); 
        const newPatientProfile = {
            _id: patient_id.substring(6),
            personalData: {
                name: newPatient.name,
                email: newPatient.email,
            },
            medicalData: {
                providers: [auth0client.userProfile.sub.substring(6)]
            }
        };

        this.props.createPatientProfile(newPatientProfile)
            .then(() => {
                console.log("also successful!");
                this.props.fetchPatients();
            });

        this.props.assignRoles(patient_id, AMT, "Patient");

        axios.post('http://localhost:5000/api/email', newPatient); 
    }

    onSearchChange = (value, e) => {
        e.preventDefault();

        // break if patients aren't fetched
        if (!this.props.patientsFetched) return;

        // search by name
        const searchResults = this.props.patients.filter(patient => {
            return patient.personalData.name.substring(0, value.length) === value
        });

        this.setState({displayedPatients: searchResults});
    }

    componentDidMount() {
        this.props.fetchPatients()
            .then(() => this.setState({ displayedPatients: this.props.patients }));
    }

    render() {
        console.log(this.state.displayedPatients);
        const { patientRegistering, registerError, patientsFetching, patientsFetched } = this.props;
        
        if(registerError) {
            return (
                <div>
                    <p>Register Error: {registerError ? registerError.message : null}</p>
                </div>
            )
        }

        if (patientRegistering) {
            return (
                <div>
                    Registering patient . . .
                </div>
            )
        }

        if (patientsFetching || !patientsFetched) {
            return (
                <div>
                    Loading patients . . .
                </div>
            )
        }

        if (this.state.onePatientView) {
            if (this.state.viewedPatient === null)
                throw "onePatientView is true, but viewedPatient is null!";
            
            return (
                 <PatientView patient={this.state.viewedPatient} />
            );
        }

        return (
            <div>

                <SearchField 
                    placeholder='Search Item'
                    onChange={this.onSearchChange}
                />

                <PatientList patients={this.state.displayedPatients} onClickPatient={this.viewPatient} />
                {this.displayNewPatientForm()}
            </div>
        );

    }
}

MyPatients.propTypes = {
    registerPatient: PropTypes.func.isRequired,
    patients: PropTypes.array.isRequired,
    patient: PropTypes.object.isRequired,
    patientRegistering: PropTypes.bool.isRequired,
    registerError: PropTypes.object.isRequired,
    createPatientProfile: PropTypes.func.isRequired,
    assignPatientRole: PropTypes.func.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    patientsFetching: PropTypes.bool.isRequired,
    patientsFetched: PropTypes.bool.isRequired,
    fetchPatientsError: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    patients: state.patientState.patients,
    patient: state.patientState.patient,
    patientRegistering: state.patientState.patientLoading, 
    patientsFetching: state.patientState.patientsFetching,
    patientsFetched: state.patientState.patientsFetched,
    fetchPatientsError: state.patientState.fetchPatientsError,

    registerError: state.providerState.registerError,
    roleAssigning: state.providerState.roleAssigning,
    roleAssignError: state.providerState.roleAssignError,

    userProfile: state.authState.userProfile, 
    userProfileLoading: state.authState.userProfileLoading, 
    userProfileError: state.authState.userProfileError,
});

export default connect(
    mapStateToProps, { 
        auth0Registration, 
        assignRoles, 
        createPatientProfile, 
        addPatientToProviderList,
        fetchPatients
    })(MyPatients);
