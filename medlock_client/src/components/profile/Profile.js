import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import { Button } from 'reactstrap';
import { editProfile, saveProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../css/Profile.css';
class Profile extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            role: props.roles[0].name,
        }
    }

    onProfileSave = (updatedPersonalData) => {
        console.log(this.state.role);
        this.props.saveProfile(updatedPersonalData, this.state.role);
    }

    onProfileEdit = () => {
        this.props.editProfile();
    }

    profileModulesHTML = profileModules => {
        var merged = [].concat.apply([], profileModules);
        profileModules = merged;
        return profileModules.map(profileModule => (
            <ProfileModule name={profileModule.name} content={profileModule.content} editable={this.props.editable} />
        ));
    };
    
    // addProfileModule = () => { 
    //     this.setState(prevState => ({
    //         profileModules: [...prevState.profileModules, 
    //             {
    //                 name: "Name",
    //                 content: "Content",
    //                 editable: true   
    //             }
    //         ]
    //     }));
    // }

    render() {
        const { personalData, profileSaving, error, editable } = this.props;
        console.log(this.props);
        
        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            )
        }

        if (profileSaving) {
            return (
                <div>
                    Saving profile . . .
                </div>
            )
        }

        return (
            <div className="profile-container" align="center">
                <h1 class="header">Profile</h1>
                <div className="main" align="center">
                    <div className="personalInfo-container">
                        <PersonalInfo personalData={personalData} onProfileSave={this.onProfileSave} onProfileEdit={this.onProfileEdit} editable={editable} role={this.state.role} />
                    </div>
                    {/* <div className="profileModules-container">
                        {this.profileModulesHTML(this.state.profileModules)}
                        <Button onClick={this.addProfileModule}>+</Button>
                    </div>                 */}
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    editable: PropTypes.object.isRequired,
    personalData: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    personalData: state.profileState.profile.personalData,
    editable: state.profileState.editable,
    profileLoading: state.profileState.loadingProfile,
    profileSaving: state.profileState.profileSaving,
    error: state.profileState.error,
    roles: state.authState.roles,
});

export default connect(mapStateToProps, { editProfile, saveProfile })(Profile);