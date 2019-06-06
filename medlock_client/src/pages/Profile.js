import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../nav/SideBar';
import DashHeader from '../components/dashboard/DashHeader';
import PersonalInfo from '../components/PersonalInfo';
import ProfileModule from '../components/ProfileModule';
import '../css/Profile.css';



class Profile extends Component {

    state = {
        profileModules: [
            {
                question: "What is your favorite color?",
                answer: "Blue"
            },
            {
                question: "What do you do for fun?",
                answer: "Kayaking"
            },
            {
                question: "Do you have any pets?",
                answer: "A dog; he's a Golden Retriever named Charlie."
            }
        ]
    }

    profileModulesHTML = profileModules => {
        return profileModules.map(profileModule => (
            <ProfileModule question={profileModule.question} answer={profileModule.answer} />
        ));
    }; 

    render() {
        return (
            <div className="profile-container">
                <div className="leftSideBar">
                    <SideBar />  
                </div>
                <div className="main">
                    <div className="personalInfo-container">
                        <PersonalInfo uid=''/>
                    </div>
                    <div className="profileModules-container">
                        {this.profileModulesHTML(this.state.profileModules)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
