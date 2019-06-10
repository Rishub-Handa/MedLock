import React, { Component } from 'react'
import { Navbar, NavbarBrand, Button, NavItem } from 'reactstrap';
import Auth from '../auth/Auth';


class Login extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`);
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    componentDidMount() {
        const { renewSession } = this.props.auth;

        if (localStorage.getItem('isLoggedIn') === 'true') {
            renewSession();
        }
    }

    render() {
        console.log("rendered");
        const { isAuthenticated } = this.props.auth;
        console.log(isAuthenticated());
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
