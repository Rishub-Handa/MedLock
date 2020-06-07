import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { fetchAMT } from '../../auth/AuthManagement';
import auth0client from '../../auth/Auth';
import { auth0Registration, assignRoles, validateRegisterCode } from '../../actions/authActions';
import { MEDLOCK_API } from '../../config/servers';
import { createPatientProfile } from '../../actions/patientActions';
import '../../css/Register.css';

const axios = require('axios');

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: "Patient",
            registerCode: "",
        };
    }

    registerUser = (newUser) => {
        console.log(newUser);
        this.props.validateRegisterCode(newUser.registerCode, newUser.role)
            .then(() => {
                console.log(this.props.registerCodeValidated);
                if (this.props.registerCodeValidated) {
                    const API_URL = `${MEDLOCK_API}/user/register`;
                    var promise = axios.post(API_URL, { newUser });
                    promise.then(res => {
                        var registeredUser = res.data;
                        console.log(registeredUser);
                        alert(`${registeredUser.name}, thank you for registering for Medlock! You should receive an email at ${registeredUser.email} from us shortly containing your login information.`);
                        window.location = window.location.origin;
                    });
                } else {
                    alert('Your registration was unsuccessful because you entered an invalid registration code.');
                }
            })
        // this code fetches AMT with is INSECURE
        // console.log(newUser);
        // this.props.validateRegisterCode(newUser.registerCode, newUser.role)
        //     .then((passed) => {
        //         console.log(passed);
        //         console.log(this.props.registerCodeValidated);
        //         if (this.props.registerCodeValidated) {
        //             fetchAMT().then(res => {
        //                 const AMT = res.data.access_token;
        //                 const password = Math.random().toString(36).slice(-12); 
        //                 var newAuth = {
        //                     name: newUser.name,
        //                     email: newUser.email,
        //                     "password": password,
        //                     "connection": "Username-Password-Authentication"
        //                 };
        //                 this.props.auth0Registration(newAuth, AMT)
        //                     .then(() => {
        //                         // assign role to new user
        //                         newUser = {
        //                             ...newUser,
        //                             _id: this.props.userProfile.user_id,
        //                         }
        //                         this.props.assignRoles(newUser._id, AMT, newUser.role);
                                
        //                         // create profile for user in MedLock db
        //                         this.registerUserInDB(newUser, AMT);
                                
        //                         // send new user login info
        //                         var url = `${MEDLOCK_API}/email`;
        //                         axios.post(url, newAuth);
        //                     })
        //                     .then(() => {
        //                         alert("Thank you for registering for Medlock! You should receive an email from us shortly containing your login information." );
        //                         window.location = window.location.origin;
        //                     })
        //                     .catch(error => {
        //                         alert(`${error}`);
        //                     })
        //             });
        //         } else {
        //         }
    }

    registerUserInDB = (newUser, AMT) => {
        console.log("registerUserInDB");
        const newUserProfile = {
            _id: newUser._id.substring(6),
            personalData: {
                name: newUser.name,
                email: newUser.email,
            }
        };

        if (newUser.role.toLowerCase() == "patient") {
            console.log("creating Patient Profile");
            var url = `${MEDLOCK_API}/patient/register`;
            axios.post(url, newUserProfile);
            // this.props.createPatientProfile(newUserProfile);
        } else if (newUser.role.toLowerCase() == "provider") {
            console.log("Create Provider");
            var url = `${MEDLOCK_API}/provider/register`;
            axios.post(url, newUserProfile);
        } else {
            console.log("Not a valid role.");
        }
        
    }

    onSubmit = e => {
        e.preventDefault(); 
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            registerCode: this.state.registerCode
        }
        this.registerUser(newUser);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="Register">
                <Form>
                    <FormGroup required>
                        <Label for="pi-name">User Name</Label>
                        <Input type="text" name="name" id="pi-name" placeholder="John Doe" value={this.state.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup required>
                        <Label for="pi-email">Email</Label>
                        <Input type="email" name="email" id="pi-email" placeholder="john.doe@gmail.com" value={this.state.email} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup required>
                        <Label for="pi-role"></Label>
                        <Input type="select" name="role" id="pi-role" value={this.state.role} onChange={this.onChange}>
                            <option value="Patient" selected="selected">Patient</option>
                            <option value="Provider">Provider</option>
                        </Input>
                    </FormGroup>
                    <FormGroup required>
                        <Label for="pi-register-code">Register Code</Label>
                        <Input type="password" name="registerCode" id="pi-register-code" value={this.state.registerCode} onChange={this.onChange} />
                    </FormGroup>
                    <Button onClick={this.onSubmit}>Register</Button>
                </Form>
            </div>
        );
    }
} 

const mapStateToProps = state => ({
    userProfileLoading: state.authState.userProfileLoading, 
    userProfileError: state.authState.userProfileError, 
    userProfile: state.authState.userProfile, 
    registerCodeValidating: state.authState.registerCodeValidating, 
    registerCodeValidated: state.authState.registerCodeValidated
});

export default connect(mapStateToProps, { auth0Registration, assignRoles, createPatientProfile, validateRegisterCode })(Register); 