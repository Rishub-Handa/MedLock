import React, { Component } from 'react';
import { Button } from 'reactstrap';
import bigLogo from '../../icons/white-logo.png'; 
import auth0client from '../../auth/Auth';
import '../../css/Login.css';
import {Helmet} from 'react-helmet';
import history from '../nav/history';

class Login extends Component {

    routeToRegister = () => {
        history.replace("/register");
    }

    render() {
        return (
                <div>
                    <Helmet>
                        <style>{'body { background-color: var(--medlock-blue); overflow: hidden }'}</style>
                    </Helmet>
                    <div id="login-logo">
                        <img className="login-logo" src={bigLogo} />
                    </div>
                    <div className="btn-container">
                        <Button onClick={auth0client.login} id="login-button">Login</Button>
                        <Button onClick={this.routeToRegister} id="register-btn">Register</Button>
                    </div>
                </div>
        );
    }
} 


export default Login; 