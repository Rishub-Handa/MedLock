import React, { Component } from 'react';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';

class SideBar extends Component {
    
    state = {
        expanded: false,
    }

    toggleSidebar = () => {
        this.setState({expanded: !this.state.expanded});
    }
    
    render() {
        return (
            <div>
                <div>
                    <Button outline color="blue" onClick={this.toggleSidebar}>
                        {
                            this.state.expanded ? "Collapse" : "Expand"
                        }
                    </Button>
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
        )
    }
}

export default SideBar;
