import React, { Component } from 'react';
import { Button, Nav, NavItem, UncontrolledCollapse } from 'reactstrap';
import { runInThisContext } from 'vm';
import { withRouter } from 'react-router-dom';
import auth0client from '../../auth/Auth';
import '../../css/SideBar.css';

class SideBar extends Component {
    
    sideBarHTML = () => {
        return (
            <div>
                <div>
                    <Button color="primary" id="toggler">Toggle</Button>
                </div>
                <div>
                    <UncontrolledCollapse toggler="#toggler">
                        <div className="menu">
                            <div>
                                <Button className="button" id='dashboard' onClick={() => {
                                    this.props.history.push("/dashboard");
                                }}>Dashboard</Button> 
                            </div>
                            <div>
                                <Button className="button" id='inbox' onClick={() => {
                                    this.props.history.push("/inbox");
                                }}>Inbox</Button>
                            </div>
                            <div>
                                <Button className="button" id='mydata' onClick={() => {
                                    this.props.history.push("/mydata");
                                }}>My Data</Button> 
                            </div>
                            <div>
                                <Button className="button" id='profile' onClick={() => {
                                    this.props.history.push("/profile");
                                }}>Profile</Button> 
                            </div>
                            <div>
                                <Button className="button" id='resources' onClick={() => {
                                    this.props.history.push("/resources");
                                }}>Resources</Button> 
                            </div>
                            <div>
                            <Button className="button" id='survey' onClick={() => {
                                    this.props.history.push("/survey");
                                }}>Survey</Button> 
                            </div>
                            <div>
                                {
                                    auth0client.isAuthenticated() ? (
                                        <Button className="button" onClick={auth0client.logout}>Logout</Button>
                                    ) : (
                                        <Button className="button" onClick={auth0client.login}>Login</Button>
                                    )
                                }
                            </div>
                        </div>
                    </UncontrolledCollapse>
                </div>
            </div>
        );
    };

    render() {
        return (
            // this.state.expanded ? this.expandedHTML() : this.collapsedHTML()
            this.sideBarHTML()
        );
    }
}

export default withRouter(SideBar);
