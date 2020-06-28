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
        const { user, viewUser, deleteUser, addDispenser } = this.props;
        console.log(viewUser);
        console.log("USER:");
        console.log(user);
        return (
            <div className="UserListItem" /*onClick={() => viewUser(user)}*/ >
                <div className="UserListItem-userInfo">
                    <div>
                        <h4>{user.personalData.name}</h4>
                    </div>
                    <div>
                        <h6 id="userid">id={user._id}</h6>
                    </div>
                </div>
                <div className="UserListItem-options">
                    {addDispenser ? 
                    <button onClick={() => addDispenser(user)}>Add Dispenser</button> : <div></div>}
                    
                    <button onClick={() => viewUser(user)}>View</button>
                    <button>Edit</button>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                </div>
            </div>
        );
    }
}
