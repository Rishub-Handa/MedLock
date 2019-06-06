import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from '../nav/SideBar';
import DashHeader from '../components/dashboard/DashHeader';
import PersonalInfo from '../components/PersonalInfo';
import ProfileModule from '../components/ProfileModule';
import '../css/Profile.css';

import { connect } from 'react-redux';


class Profile extends Component {

    state = {
        editable: false,
        user: {
            name: "John Doe",
            bio: "40 years old. Born and raised in Centreville, VA."
        },
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

    editProfile = () => {
        if (this.state.editable) {
            this.setState({})
        }
        this.setState({editable: !this.state.editable});
        
    };

    render() {
        return (
            <div className="profile-container">
                <div className="leftSideBar">
                    <SideBar />  
                </div>
                <div className="main">
                    <div className="personalInfo-container">
                        <div>
                            <PersonalInfo user={this.state.user} editable={this.state.editable} />
                        </div>
                        <div className="editButton-container">
                        <button onClick={this.editProfile}>
                            {
                                this.state.editable ? "Save" : "Edit"
                            }
                        </button>
                        </div>
                    </div>
                    <div className="profileModules-container">
                        {this.profileModulesHTML(this.state.profileModules)}
                    </div>
                </div>
            </div>
        );
    }
}

mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, );
