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
        this.props.validateRegisterCode(newUser.registerCode, newUser.role)
            .then((passed) => {
                console.log(passed);
                console.log(this.props.registerCodeValidated);
                if (this.props.registerCodeValidated) {
                    fetchAMT().then(res => {
                        const AMT = res.data.access_token;
                        const password = Math.random().toString(36).slice(-12); 
                        var newAuth = {
                            name: newUser.name,
                            email: newUser.email,
                            "password": password,
                            "connection": "Username-Password-Authentication"
                        };
                        this.props.auth0Registration(newAuth, AMT)
                            .then(() => {
                                // assign role to new user
                                newUser = {
                                    ...newUser,
                                    _id: this.props.userProfile.user_id,
                                }
                                this.props.assignRoles(newUser._id, AMT, newUser.role);
                                
                                // create profile for user in MedLock db
                                this.registerUserInDB(newUser, AMT);
                                
                                // send new user login info
                                var url = `${MEDLOCK_API}/email`;
                                axios.post(url, newUser);
                            })
                            .then(() => {
                                alert("Thank you for registering for Medlock! You should receive an email from us shortly containing your login information." );
                                window.location = window.location.origin;
                            })
                            .catch(error => {
                                alert(`${error}`);
                            })
                    });
                } else {
                    alert('Your registration was unsuccessful because you entered an invalid registration code.');
                }
            })
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

        if (newUser.role == "Patient") {
            console.log("creating Patient Profile");
            var url = `${MEDLOCK_API}/patient/register`;
            axios.post(url, newUserProfile);
            // this.props.createPatientProfile(newUserProfile);
        } else if (newUser.role == "Provider") {
            console.log("Create Provider");
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
                        <Label for="pi-name">Full Name</Label>
                        <Input type="text" name="name" id="pi-name" placeholder="Harry Potter" value={this.state.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup required>
                        <Label for="pi-email">Email</Label>
                        <Input type="email" name="email" id="pi-email" placeholder="harry.potter@hogwarts.edu" value={this.state.email} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup required>
                        <Label for="pi-role"></Label>
                        <Input type="select" name="role" id="pi-role" value={this.state.role} onChange={this.onChange}>
                            <option value="patient" selected="selected">Patient</option>
                            <option value="provider">Provider</option>
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