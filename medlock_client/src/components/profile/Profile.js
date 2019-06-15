import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import '../../css/Profile.css';
import auth0client from '../../auth/Auth';
import EditProfile from './EditProfile';
import { loadProfile, createProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import { stat } from 'fs';

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    // profileModulesHTML = profileModules => {
    //     return profileModules.map(profileModule => (
    //         <ProfileModule question={profileModule.question} answer={profileModule.answer} />
    //     ));
    // }; 

    render() {
        // var modules = {
        //     profileModules: [
        //         {
        //             question: "Question1",
        //             answer: "Answer1"
        //         }
        //     ]
        // }

    
        const { profile } = this.props;
        
        return (
            <div className="profile-container">
                <div className="main">
                    <div className="personalInfo-container">
                        <PersonalInfo profile={this.props.profile}/>
                    </div>
                    {/* <div className="profileModules-container">
                        {this.profileModulesHTML(modules.profileModules)}
                    </div> */}
                </div>
            </div>
        );
    }
}

export default Profile;