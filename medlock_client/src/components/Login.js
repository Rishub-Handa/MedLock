import React, { Component } from 'react'
import { Navbar, NavbarBrand, Button, NavItem } from 'reactstrap';
import auth0client from '../auth/Auth';

class Login extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`);
    }

    login() {
        auth0client.login();
    }

    logout() {
        auth0client.logout();
    }

    /*
    componentDidMount() {
        const { renewSession } = auth0client;

        if (localStorage.getItem('isLoggedIn') === 'true') {
            renewSession();
        }
    }
    */

    render() {
        const { isAuthenticated } = auth0client;
        return (
            <div>
                <Navbar vertical>
                    <NavItem>
                        <NavbarBrand>
                            <a href="#">Auth0 - React</a>
                        </NavbarBrand>
                    </NavItem>
                    <NavItem>
                        <Button
                            bsStyle="primary"
                            className="btn-margin"
                            onClick={this.goTo.bind(this, 'home')} 
                            >
                            Home
                        </Button>
                    </NavItem>
                    <NavItem>
                        <Button onClick={this.login.bind(this)}>Log In</Button>
                    </NavItem>
                    <NavItem>
                        <Button onClick={this.logout.bind(this)}>Log Out</Button>    
                    </NavItem>
                </Navbar>
            </div>
        )
    }
}

export default Login;
