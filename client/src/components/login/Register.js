import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { fetchAMT } from '../../auth/AuthManagement';
import auth0client from '../../auth/Auth';
import { auth0Registration, assignRoles } from '../../actions/authActions';
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
        };
    }

    registerUser = (newUser) => {
        fetchAMT().then(res => {
            const AMT = res.data.access_token;
            const password = Math.random().toString(36).slice(-12); 
            newUser = {
                ...newUser,
                "password": password,
                "connection": "Username-Password-Authentication"
            };
            this.props.auth0Registration(newUser, AMT)
                .then(() => {
                    alert(`Successfully Registered New User with Auth0.`);
                    // assign role to new user
                    newUser = {
                        ...newUser,
                        _id: this.props.userProfile.user_id,
                        role: "Patient",
                    }
                    this.props.assignRoles(newUser._id, AMT, newUser.role);
                    
                    // create profile for user in MedLock db
                    this.registerUserInDB(newUser, AMT);
                    
                    // send new user login info
                    var url = `${MEDLOCK_API}/email`;
                    axios.post(url, newUser);
                })
                .catch(error => {
                    alert(`${error}`);
                })
        });
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
            email: this.state.email
        }
        this.registerUser(newUser, "Patient");
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
                    <Button onClick={this.onSubmit}>Save</Button>
                </Form>
            </div>
        );
    }
} 

const mapStateToProps = state => ({
    userProfileLoading: state.authState.userProfileLoading, 
    userProfileError: state.authState.userProfileError, 
    userProfile: state.authState.userProfile, 
});

export default connect(mapStateToProps, { auth0Registration, assignRoles, createPatientProfile })(Register); 