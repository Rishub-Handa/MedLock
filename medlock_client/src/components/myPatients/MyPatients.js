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

const axios = require('axios'); 

class MyPatients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPatientForm: false,
        }
        console.log(props);
    }

    viewPatient = () => {
        console.log("View Patient");
        console.log(this.props);
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

    submitForm = (email) => {

        const password = Math.random().toString(36).slice(-12); 

        const newPatient = {
            "name": email, 
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
                    
                    getUserByEmail(email, AMT) 
                        .then(res => {
                            const user_id = res.data[0].user_id; 
                            console.log(user_id); 
                            // Create a function for existing patient 
                        })
                }); 
            }) 
            .catch(error => console.log(error)); 
        
    }

    createPatient = (newPatient, AMT, patient_id) => {
        console.log("Patient registered. Now creating profile . . . "); 
        console.log(patient_id); 
        const newPatientProfile = {
            _id: patient_id.substring(6),
            personalData: {
                name: newPatient.email,
                email: newPatient.email,
            },
            medicalData: {
                providers: [auth0client.userProfile.sub.substring(6)]
            }
        };
        this.props.createPatientProfile(newPatientProfile); 
        this.props.assignRoles(patient_id, AMT, "Patient");

        axios.post('http://localhost:5000/api/email', newPatient); 
        
    }

    componentDidMount() {
        this.props.fetchPatients()
            .then(() => console.log(this.props.patients));
    }

    render() {
        const { patientRegistering, registerError } = this.props;
        
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

        const tempPatients = [
            {
                name: "Jane"
            },
            {
                name: "Joe"
            },
            {
                name: "Bill"
            },
        ];

        return (
            <div>
                <PatientList patients={this.props.patients} onClickPatient={this.viewPatient} />
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
    assignPatientRole: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    patients: state.patientState.patients,
    patient: state.patientState.patient,
    patientRegistering: state.patientState.patientLoading, 
    registerError: state.providerState.registerError,
    roleAssigning: state.providerState.roleAssigning,
    roleAssignError: state.providerState.roleAssignError, 
    userProfile: state.authState.userProfile, 
    userProfileLoading: state.authState.userProfileLoading, 
    userProfileError: state.authState.userProfileError 
});

export default connect(
    mapStateToProps, { 
        auth0Registration, 
        assignRoles, 
        createPatientProfile, 
        addPatientToProviderList,
        fetchPatients
    })(MyPatients);
