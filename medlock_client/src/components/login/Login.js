import React, { Component } from 'react';
import { Button } from 'reactstrap';
import auth0client from '../../auth/Auth';
import '../../css/Login.css';

class Login extends Component {

    render() {
        return (
                <div id="login-container" >
                    <h1 id="login-header">You need to login.</h1>
                    <Button onClick={auth0client.login} id="login-button">Login</Button>
                </div>
        );
    }
} 


export default Login; 