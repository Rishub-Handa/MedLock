import React, { Component } from 'react';
import { Button, Nav, NavItem, UncontrolledCollapse } from 'reactstrap';
import { runInThisContext } from 'vm';
import { withRouter } from 'react-router-dom';
import auth0client from '../../auth/Auth';
import { modules } from './ModuleInfo'; 
import '../../css/SideBar.css';

class SideBar extends Component {

    state = {
        modules, 
    }
    
    sideBarHTML = () => {
        return (
            <div>
                <div>
                    <Button color="primary" id="toggler">Toggle</Button>
                </div>
                <div>
                    <UncontrolledCollapse toggler="#toggler">
                        <div className="menu">
                            {this.state.modules.map(module => {
                                return (
                                    <div>
                                        <Button className="button" 
                                                onClick={() => {
                                                    this.props.history.push(module.link)
                                            }}>{module.name}</Button>
                                    </div>
                                )
                            })}
                            <div>
                            <Button className="button" 
                                    onClick={() => {
                                        this.props.history.push("/dashboard/survey");
                                }}>Will Remove - Survey</Button> 
                            </div>
                            <div>
                            <Button className="button" 
                                    onClick={() => {
                                        this.props.history.push("/dashboard/dispenser");
                                }}>Will Remove - Dispenser</Button> 
                            </div>
                            <div>
                            <Button className="button" 
                                    onClick={() => {
                                        this.props.history.push("/dashboard/serverendpoints");
                                }}>Will Remove - Server Endpoints</Button> 
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
