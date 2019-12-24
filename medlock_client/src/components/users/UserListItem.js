import React, { Component } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import '../../css/UserListItem.css';

export default class UserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { user, viewUser, deleteUser } = this.props;
        return (
            <div className="UserListItem">
                <div className="UserListItem-userInfo">
                    <div>
                        <h4>{user.personalData.name}</h4>
                    </div>
                    <div>
                        <h6 id="userid">id={user._id}</h6>
                    </div>
                </div>
                <div className="UserListItem-options">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle>...</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => viewUser(user)}>View</DropdownItem>
                            <DropdownItem disabled>Edit</DropdownItem>
                            <DropdownItem onClick={() => deleteUser(user._id)}>Delete</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
