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
        }
    }

    onProfileSave = (updatedPersonalData) => {
        this.props.saveProfile(updatedPersonalData);
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
    
    addProfileModule = () => { 
        this.setState(prevState => ({
            profileModules: [...prevState.profileModules, 
                {
                    name: "Name",
                    content: "Content",
                    editable: true   
                }
            ]
        }));
    }

    render() {
        const { personalData, savingProfile, error, editable } = this.props;
        console.log(this.props);
        
        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            )
        }

        if (savingProfile) {
            return (
                <div>
                    Saving profile . . .
                </div>
            )
        }

        return (
            <div className="profile-container">
                <div className="main">
                    <div className="personalInfo-container">
                        <PersonalInfo personalData={personalData} onProfileSave={this.onProfileSave} onProfileEdit={this.onProfileEdit} editable={editable} />
                    </div>
                    <div className="profileModules-container">
                        {this.profileModulesHTML(this.state.profileModules)}
                        <Button onClick={this.addProfileModule}>+</Button>
                    </div>                
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    editable: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    personalData: state.profileState.profile.personalData,
    editable: state.profileState.editable,
    loadingProfile: state.profileState.loadingProfile,
    loadingProfile: state.profileState.loadingProfile,
    error: state.profileState.error
})

export default connect(mapStateToProps, { editProfile, saveProfile })(Profile);