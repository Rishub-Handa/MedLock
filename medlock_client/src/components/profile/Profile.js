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
        const { userProfile } = auth0client;
        this.state = {
            profile: {
                _id: userProfile.sub.substring(6),
                name: userProfile.nickname,
                bio: "default bio"
            }
        };
    }


    componentDidMount() {
        console.log("componentDidMount");
        this.props.loadProfile();  
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        console.log(!this.props.profile);
        const { userProfile } = auth0client;
        if(this.props.profileLoaded && !this.props.creating && !this.props.profile) {
            this.props.createProfile({
                _id: userProfile.sub.substring(6),
                name: userProfile.name,
                bio: "default bio"
            });
        }
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

        const { profile, loading, creating, error } = this.props;
        
        console.log(this.props);
        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            );
        }

        if (loading || creating || !profile) {
            return (
                <div>
                    Loading . . .
                </div>
            )
        } 

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

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    loadProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    profileLoaded: PropTypes.bool.isRequired,
    creating: PropTypes.bool.isRequired,
    profileCreated: PropTypes.bool.isRequired,
    error: PropTypes.string,
}

const mapStateToProps = state => ({
    profile: state.profileState.profile,
    loading: state.profileState.loading,
    profileLoaded: state.profileState.profileLoaded,
    creating: state.profileState.creating,
    profileCreated: state.profileState.profileCreated,
    error: state.profileState.error
});

export default connect(mapStateToProps, { loadProfile, createProfile })(Profile);
