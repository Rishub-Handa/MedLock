import React, { Component } from 'react';
import profilePic from './profile_pic.jpg';
import '../../css/UserInfo.css';

export default class UserInfo extends Component {
    render() {
        return (
            <div className="UserInfo">
                <div className="dropdown">
                    {this.props.name}
                </div>
                <div>
                    <img className="profile-picture" src={profilePic} alt="Profile Picture"/>
                </div>
            </div>
        )
    }
}
