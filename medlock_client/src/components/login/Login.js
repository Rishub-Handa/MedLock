import React, { Component } from 'react';
import { Button } from 'reactstrap';
import bigLogo from '../../icons/white-logo.png'; 
import auth0client from '../../auth/Auth';
import '../../css/Login.css';
import {Helmet} from 'react-helmet';


class Login extends Component {

    render() {
        return (
                <div>
                    <Helmet>
                        <style>{'body { background-color: var(--medlock-blue); }'}</style>
                    </Helmet>
                    <div id="login-logo">
                        <img className="dash-logo" src={bigLogo} />
                    </div>
                    <Button onClick={auth0client.login} id="login-button">Login</Button>
                </div>
        );
    }
} 


export default Login; 