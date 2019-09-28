import React, { Component } from 'react';
import { Button, ButtonGroup, Nav, NavItem, UncontrolledCollapse } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import auth0client from '../../../auth/Auth';
import { modules } from '../ModuleInfo'; 
import '../../../css/SideBar.css';

import SideBarItem from './SideBarItem';
import PersonalDataView from '../../patientView/PersonalDataView';
import ModuleLink from './ModuleLink';


class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modules,
        }
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
                <div className="ModuleLinks-container">
                    <h6 className="SideBar-subtitle">NAVIGATE</h6>
                        {this.state.modules.map(module => {
                            console.log(module);
                            return (
                                <ModuleLink 
                                    module={module} />
                            );
                        })}
                </div>
        );
    }

    collapseSidebar = (x) => {
        if (x.matches) {
            console.log("Collapse SideBar!");
            this.setState({ collapsed: true});
        } 
    }

    expandedSideBar = () => {
        return (
            <div className="SideBar">
                <div className="SideBar-welcome">
                    <h4>Welcome <strong>{this.props.personalData.name}</strong></h4>
                </div>
                {this.sideBarItemsHTML()}
                {/* <h6 className="SideBar-subtitle">Data Preview</h6>
                <div className="SideBar-section">
                    <h6>Time until next dispense</h6>
                    <Button>Click to Reveal</Button>
                </div>
                <div className="SideBar-section">
                    <h6>Average PDI Survey Result</h6>
                    <h5>7.3</h5>
                </div> */}
                <div className="logoutButton-container">
                    <button
                        className="logoutButton"
                        onClick={auth0client.logout}
                    >Logout</button>
                </div>
            </div>
        );
    }

    collapsedSideBar = () => {
        return (
            <div className="Collapsed">

            </div>
        );
    }

    render() {
        if (this.props.collapsed) {
            return this.collapsedSideBar();
        } else {
            return this.expandedSideBar();
        }
    }
}

export default withRouter(SideBar);
