import React, { Component } from 'react';
import SearchField from 'react-search-field';
import UserListItem from './UserListItem';
import '../../css/UserList.css';

export default class UserList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            displayedUsers: this.props.users,
        }
    }
    
    userHTML = (users) => {
        return this.state.displayedUsers.map(user => (
            <UserListItem 
                className="listItem"
                user={user}
                deleteUser={this.props.deleteUser}
                viewUser={this.props.viewUser}
            />
        ));
    }

    onSearchChange = (value, e) => {
        e.preventDefault();
        const searchResults = this.props.users.filter(user => {
            return (
                (user.personalData.name.substring(0, value.length) === value) || 
                (user._id.substring(0, value.length) === value) ||
                (user.personalData.email.substring(0, value.length) === value)
            );
        });
        this.setState({ displayedUsers: searchResults });
    }
    
    render() {
        return (
            <div className="UserList">
                <div className="UserList-header">
                    <h3>{this.props.title}</h3>
                    <SearchField
                        onChange={this.onSearchChange}
                    />
                </div>
                <div className="Users-container">{this.userHTML(this.props.users)}</div>
            </div>
        )
    }
}
