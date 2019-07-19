import React, { Component } from 'react';
import UserList from '../../../users/UserList';


export default class ProviderSection extends Component {
    viewUser = (user) => {
        console.log(`Mock Viewing: ${user.personalData.name}`);
    }
    
    deleteUser = (id) => {
        console.log(`Mock Deleting: user(id=${id})`);
    }
    
    render() {
        return (
            <div>
                <h3>Providers</h3>
                <div className="providerList-container">
                    <UserList 
                        users={this.props.providers}
                        viewUser={this.viewUser}
                        deleteUser={this.deleteUser}
                    />
                </div>
            </div>
        );
    }
}
