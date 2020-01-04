import React, { Component } from 'react'; 
import auth0client from '../../auth/Auth'; 

const axios = require('axios'); 

class ServerEndpoints extends Component {


    testEndpoint = () => {
        
        const { getAccessToken } = auth0client; 
        const headers = { 'Authorization': `Bearer ${getAccessToken()}`}; 

        axios.get('http://localhost:5000/api/provider/patients', { headers }) 
            .then(res => console.log(res)); 
    }

    render() {
        return (
            <div>
                <h1>This page tests Server Endpoints. </h1>
                <button onClick={this.testEndpoint}>Test Endpoint. </button>
            </div>
        )
    }
} 
export default ServerEndpoints; 