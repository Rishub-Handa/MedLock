import React, { Component } from 'react';
import PatientList from './PatientList';
import AddPatientForm from './AddPatientForm';
import { fetchAMT, getUserByEmail } from '../../auth/AuthManagement';
import { auth0Registration, assignRoles } from '../../actions/authActions';
import { createPatientProfile, addPatientToProviderList, removePatient, fetchPatients, deletePatient } from '../../actions/patientActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import auth0client from '../../auth/Auth';
import PatientView from '../patientView/PatientView';
import SearchField from 'react-search-field';
import UserList from '../users/UserList';
import { MEDLOCK_API } from '../../config/servers';
import DispenserCode from '../patientData/DispenserCode';
import '../../css/MyPatients.css';


const axios = require('axios');

class MyPatients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPatientForm: false,
            onePatientView: false,
            viewedPatient: null,
            toggleDispenserCodeDisplay: false,
            dispenserCodeUser: null
        }
    }

    viewPatient = (patient) => {
        console.log("viewPatient called");
        console.log(patient);
        this.setState({
            onePatientView: true,
            viewedPatient: patient
        });
        this.props.history.push("/dashboard/mypatients/viewpatient");
    }

    onRemovePatient = (patientId) => {
        this.props.removePatient(patientId);
    }

    addPatient = () => {
        this.setState({ newPatientForm: true });
    }

    addDispenser = (user) => {
        console.log(user);
        this.setState({
            toggleDispenserCodeDisplay: true,
            dispenserCodeUser: user
        });
        console.log(this.state.toggleDispenserCodeDisplay);
    }

    hideDispenserCode = () => {
        this.setState({ toggleDispenserCodeDisplay: false });
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
        /*
        else {
            return (
                <div>
                    <Button onClick={this.addPatient} id = "register-patient">Register Patient</Button>
                </div>
            )
        }
        */
    }

    // TODO: restructure logic so AMT isn't fetched beforehand
    submitForm = (name, email) => {

        // const password = Math.random().toString(36).slice(-12); 

        // const newPatient = {
        //     "name": name, 
        //     "email": email,
        //     "password": password,
        //     "connection": "Username-Password-Authentication"
        // };
            

        // fetchAMT() 
        //     .then(res => {

        //         const AMT = res.data.access_token; 

        //         this.props.auth0Registration(newPatient, AMT)
        //         .then(() => { 
        //             alert(`Patient Succesfully Added`);
        //             this.createPatient(newPatient, AMT, this.props.userProfile.user_id);
        //         })
        //         .catch(error => {
        //             console.log(`User Registration Error: ${error}`); 
        //             const errorString = `${error}`; 
        //             console.log(errorString.includes("409")); 
        //             if(!errorString.includes("409")) alert(`Failed To Add Patient. Error Code: ${error}`);
                    
        //             if(errorString.includes("409")) {
        //                 getUserByEmail(email, AMT) 
        //                     .then(res => {
        //                         const user_id = res.data[0].user_id; 
        //                         console.log(user_id); 

        //                         const newPatientProfile = {
        //                             _id: user_id.substring(6),
        //                             personalData: {
        //                                 name: name,
        //                                 email: email,
        //                             },
        //                             medicalData: {
        //                                 providers: [auth0client.userProfile.sub.substring(6)]
        //                             }
        //                         };
        //                         this.props.createPatientProfile(newPatientProfile);
        //                     })
        //                     .then(() => {
        //                         console.log("successful");
        //                         this.props.fetchPatients();
        //                     })
        //             }
        //         });
        //     }) 
        //     .then((err) => {
        //         this.props.fetchPatients();
        //         if(err) console.log(err);
        //     })
        //     .catch(error => {alert(`Failed To Create Patient. Error Code: ${error}`); console.log(error);});

        // this.setState({ newPatientForm: false });
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

        this.props.patients.push(newPatientProfile);

        var url = `${MEDLOCK_API}/email`;
        axios.post(url, newPatient);
    }

    componentDidMount() {
        this.props.fetchPatients();
    }

    render() {
        console.log(this.props.history);
        const { patientRegistering, registerError, patientsFetching, patientsFetched } = this.props;

        if (registerError) {
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
                    <div class="loader"></div>
                    <p class="loading-text">Loading...</p>
                </div>
            )
        }

        if (this.state.onePatientView) {
            if (this.state.viewedPatient === null)
                throw "onePatientView is true, but viewedPatient is null!";

            if (this.props.history.location.pathname == "/dashboard/mypatients/viewpatient") {
                return (
                    <PatientView patient={this.state.viewedPatient} />
                );
            }
        }

        return (
            <div className="MyPatients">
                {
                    this.state.toggleDispenserCodeDisplay &&
                    <div className="DispenserCode-container">
                        <DispenserCode hideDispenserCode={this.hideDispenserCode}
                            userProfile={this.state.dispenserCodeUser} />
                    </div>
                }
                <UserList
                    title="My Patients"
                    users={this.props.patients}
                    viewUser={this.viewPatient}
                    deleteUser={this.onRemovePatient}
                    addDispenser={this.addDispenser}
                />
                {this.displayNewPatientForm()}
            </div>
        );

    }
}

MyPatients.propTypes = {
    patients: PropTypes.array.isRequired,
    patient: PropTypes.object.isRequired,

    registerPatient: PropTypes.func.isRequired,
    patientRegistering: PropTypes.bool.isRequired,
    registerError: PropTypes.object.isRequired,

    createPatientProfile: PropTypes.func.isRequired,
    assignPatientRole: PropTypes.func.isRequired,
    fetchPatients: PropTypes.func.isRequired,
    patientsFetching: PropTypes.bool.isRequired,
    patientsFetched: PropTypes.bool.isRequired,
    fetchPatientsError: PropTypes.object.isRequired,

    removePatient: PropTypes.func.isRequired,
    patientRemoving: PropTypes.bool.isRequired,
    lastRemovedPatient: PropTypes.object.isRequired,
    patientRemoveError: PropTypes.object

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

    patientRemoving: state.patientState.patientRemoving,
    lastRemovedPatient: state.patientState.lastRemovedPatient,
    patientRemoveError: state.patientState.patientRemoveError,

});

export default connect(
    mapStateToProps, {
    auth0Registration,
    assignRoles,
    createPatientProfile,
    addPatientToProviderList,
    fetchPatients,
    removePatient,
})(MyPatients);
