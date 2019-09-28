import React, { Component } from 'react';
import { Button } from 'reactstrap';
import auth0client from '../../auth/Auth';

class Login extends Component {

    render() {
        return (
            <div>
                <h1>You need to login.</h1>
                <button className='login-btn' onClick={auth0client.login}>Login</button>
            </div>
        );
    }
} 


export default Login; 