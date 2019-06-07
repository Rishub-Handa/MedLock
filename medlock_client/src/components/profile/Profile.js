import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../nav/SideBar';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import '../../css/Profile.css';

import { connect } from 'react-redux';


class Profile extends Component {

    profileModulesHTML = profileModules => {
        return profileModules.map(profileModule => (
            <ProfileModule question={profileModule.question} answer={profileModule.answer} />
        ));
    }; 

    render() {
        var modules = {
            profileModules: [
                {
                    question: "Question1",
                    answer: "Answer1"
                }
            ]
        }

        return (
            <div className="profile-container">
                <div className="leftSideBar">
                    <SideBar />  
                </div>
                <div className="main">
                    <div className="personalInfo-container">
                        <PersonalInfo />
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
