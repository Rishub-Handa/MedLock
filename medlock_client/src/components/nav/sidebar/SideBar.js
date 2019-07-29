import React, { Component } from 'react';
import { Button, ButtonGroup, Nav, NavItem, UncontrolledCollapse } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import auth0client from '../../../auth/Auth';
import { modules } from '../ModuleInfo'; 
import '../../../css/SideBar.css';
import SideBarItem from './SideBarItem';

class SideBar extends Component {

    state = {
        modules, 
    }

    containsRole = (roles, requiredRole) => {
        var retval = false;
        roles.forEach(role => {
            if (role.name === requiredRole) 
                retval = true;
        });
        return retval;
    }

    filterModules = () => {
        const { roles } = this.props;
        const role = roles[0].name;
        const newModules = modules.filter(module => {
            // module can be seen by all roles
            if (module.roles === null) return true;

            // module can only be seen by specific role
            else if (this.containsRole(module.roles, role)) return true;

            // module filtered out
            else return false;
        });
        this.setState({modules: newModules});
    }

    componentDidMount() {
        this.filterModules();
    }
    
    sideBarHTML = () => {
        return (
            <div className="SideBar">
                <div className="SideBarItems-container">
                    <ButtonGroup className="SideBarButtonGroup" size="lg" vertical>
                        {this.state.modules.map(module => {
                            return (
                                <Button 
                                    outline color="primary"
                                    className="button"
                                    onClick={() => {
                                        this.props.history.push(module.link)
                                    }}
                                >{module.name}</Button>
                            );
                        })}
                        <Button 
                            outline color="primary"
                            onClick={auth0client.logout}>Logout</Button>
                    </ButtonGroup>
                </div>
            </div>
            // <div>
            //     <div>
            //         <Button color="primary" id="toggler">Toggle</Button>
            //     </div>
            //     <div>
            //         <UncontrolledCollapse toggler="#toggler">
            //             <div className="menu">
            //                 {this.state.modules.map(module => {
            //                     return (
            //                         <div>
            //                             <Button className="button" 
            //                                     onClick={() => {
            //                                         this.props.history.push(module.link)
            //                                 }}>{module.name}</Button>
            //                         </div>
            //                     )
            //                 })}
            //                 <div>
            //                 <Button className="button" 
            //                         onClick={() => {
            //                             this.props.history.push("/dashboard/survey");
            //                     }}>Will Remove - Survey</Button> 
            //                 </div>
            //                 <div>
            //                 <Button className="button" 
            //                         onClick={() => {
            //                             this.props.history.push("/dashboard/dispenser");
            //                     }}>Will Remove - Dispenser</Button> 
            //                 </div>
            //                 <div>
            //                 <Button className="button" 
            //                         onClick={() => {
            //                             this.props.history.push("/dashboard/serverendpoints");
            //                     }}>Will Remove - Server Endpoints</Button> 
            //                 </div>
                            // <div>
                            //     {
                            //         auth0client.isAuthenticated() ? (
                            //             <Button className="button" onClick={auth0client.logout}>Logout</Button>
                            //         ) : (
                            //             <Button className="button" onClick={auth0client.login}>Login</Button>
                            //         )
                            //     }
                            // </div>
            //             </div>
            //         </UncontrolledCollapse>
            //     </div>
            // </div>
        );
    }

    render() {
        return (
            // this.state.expanded ? this.expandedHTML() : this.collapsedHTML()
            this.sideBarHTML()
        );
    }
}

export default withRouter(SideBar);
