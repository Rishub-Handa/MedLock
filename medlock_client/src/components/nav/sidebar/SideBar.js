import React, { Component } from 'react';
import { Button, ButtonGroup, Nav, NavItem, UncontrolledCollapse } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import auth0client from '../../../auth/Auth';
import { modules } from '../ModuleInfo'; 
import '../../../css/SideBar.css';
import bigLogo from '../../../images/bigLogo.png'; 

import SideBarItem from './SideBarItem';
import PersonalDataView from '../../patientView/PersonalDataView';


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
    
    sideBarItemsHTML = () => {
        return (
                <div className="SideBarItems-container">
                    <h6>Modules</h6>
                        {this.state.modules.map(module => {
                            return (
                                <button 
                                    className="SideBarButton"
                                    color="#419bf9"
                                    onClick={() => {
                                        this.props.history.push(module.link)
                                    }}
                                >{module.name}</button>
                            );
                        })}
                        <button
                            className="SideBarButton"
                            color="#419bf9"
                            onClick={auth0client.logout}>Logout</button>
                </div>
        );
    }

    render() {
        return (
            <div className="SideBar">
                <div className="logo-container">
                    <img className="dash-logo" src={bigLogo} />
                </div>
                <div className="SideBar-welcome">
                    <h4>Welcome, {this.props.personalData.name}</h4>
                </div>
                {this.sideBarItemsHTML()}
                <div>
                    <h6>Time until next dispense</h6>
                    <Button>Click to Reveal</Button>
                </div>
                <div>
                    <h6>Average PDI Survey Result</h6>
                    <h5>7.3</h5>
                </div>
            </div>
        );
    }
}

export default withRouter(SideBar);
