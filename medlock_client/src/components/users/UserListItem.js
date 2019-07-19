import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../../css/UserListItem.css';

export default class UserListItem extends Component {
    render() {
        const { user, viewUser, deleteUser } = this.props;
        return (
            <div className="UserListItem">
                <div>
                    <h4>{user.personalData.name}</h4>
                </div>
    
                <div>
                    <Button onClick={() => viewUser(user)}>View</Button>
                    <Button onClick={() => deleteUser(user._id)}>Delete</Button>
                </div>
            </div>
        );
    }
}
