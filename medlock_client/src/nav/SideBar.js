import React, { Component } from 'react';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';

class SideBar extends Component {
    
    state = {
        expanded: true,
    };

    toggleSidebar = () => {
        this.setState({expanded: !this.state.expanded});
    };

    expandedHTML = () => {
        return (
            <div>
                <div>
                    <Button outline color="blue" onClick={this.toggleSidebar}>Collapse</Button>
                </div>
                <div>
                    <Nav vertical>
                        <NavItem>
                            <h1>My Data</h1>
                        </NavItem>
                        <NavItem>
                            <h1>Inbox</h1>
                        </NavItem>
                        <NavItem>
                            <h1>Resources</h1>
                        </NavItem>
                    </Nav>
                </div>
            </div>
        );
    };

    collapsedHTML = () => {
        return (
            <div>
                <div>
                    <Button outline color="blue" onClick={this.toggleSidebar}>Expand</Button>
                </div>
                <div>
                    <h1>Menu Bar</h1>
                </div>
            </div>
        );
    };

    
    
    render() {
        return (
            this.state.expanded ? this.expandedHTML() : this.collapsedHTML()
        );
    }
}

export default SideBar;
