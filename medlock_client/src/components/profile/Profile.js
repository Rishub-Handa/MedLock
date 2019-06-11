import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../nav/SideBar';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import '../../css/Profile.css';

import { connect } from 'react-redux';


class Profile extends Component {

    state = {
        profile: {}
    };

    UNSAFE_componentWillMount() {
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile});
        }
        console.log("HERE")
    }

    profileModulesHTML = profileModules => {
        return profileModules.map(profileModule => (
            <ProfileModule question={profileModule.question} answer={profileModule.answer} />
        ));
    }; 

    render() {
        console.log(this.props.auth.isAuthenticated());
        var modules = {
            profileModules: [
                {
                    question: "Question1",
                    answer: "Answer1"
                }
            ]
        }

        console.log("PROFILE");
        console.log(this.state.profile);
        return (
            <div className="profile-container">
                <div className="leftSideBar">
                    <SideBar />  
                </div>
                <div className="main">
                    <div className="personalInfo-container">
                        <PersonalInfo userProfile={this.state.profile} />
                    </div>
                    <div className="profileModules-container">
                        {this.profileModulesHTML(modules.profileModules)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
