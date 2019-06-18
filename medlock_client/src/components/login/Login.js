import React, { Component } from 'react';
import { Button } from 'reactstrap';
import auth0client from '../../auth/Auth';

class Login extends Component {

    render() {
        return (
            <div>
                <h1>You need to login.</h1>
                <Button onClick={auth0client.login}>Login</Button>
            </div>
        );
    }
} 


export default Login; 