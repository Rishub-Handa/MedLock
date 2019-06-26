import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import { fetchAMT } from '../../auth/AuthManagement'; 
import { auth0Registration, assignRoles } from '../../actions/authActions'; 
import { createProviderProfile } from '../../actions/providerActions'; 

const axios = require('axios'); 

class Admin extends Component {



    state = {}; 

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
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
        axios.post('http://localhost:5000/api/email', newProvider); 
    }

    render() {
        return (
            <div>
                <h1>Administration</h1>
                <h1>Create New Provider</h1>
                <form onSubmit={this.createNewProvider}>
                    <p>Name: <input type="text" name="name" onChange={this.onChange} /></p>
                    <p>Email: <input type="text" name="email" onChange={this.onChange} /></p>
                    <button type="submit">Create. </button>
                </form>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    userProfile: state.authState.userProfile 
});

export default connect(mapStateToProps, { auth0Registration, createProviderProfile, assignRoles })(Admin); 