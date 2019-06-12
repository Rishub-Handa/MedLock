import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../nav/SideBar';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import '../../css/Profile.css';
import auth0client from '../../auth/Auth';

import { connect } from 'react-redux';


class Profile extends Component {

    state = {
        profile: {
            name: '',
        }
    };

    UNSAFE_componentWillMount() {
        const { userProfile, getProfile } = auth0client;
        this.setState({
            profile: {
                name: userProfile.name
            }
        })
        console.log(userProfile);

    }

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

        console.log(this.state.profile);
        return (
            <div className="profile-container">
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
