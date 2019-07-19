import React, { Component } from 'react';
import SearchField from 'react-search-field';
import UserListItem from './UserListItem';
import '../../css/UserList.css';

export default class UserList extends Component {
    
    constructor(props) {
        super(props);
        console.log("UserList Props: ");
        console.log(props);
        this.state = {
            displayedUsers: this.props.users,
        }
    }
    
    userHTML = (users) => {
        return users.map(user => (
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
            return user.personalData.name.substring(0, value.length) === value;
        });
        this.setState({ displayedUsers: searchResults });
    }
    
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <SearchField
                    onChange={this.onSearchChange}
                />
                <div className="Users-container">{this.userHTML(this.props.users)}</div>
            </div>
        )
    }
}
