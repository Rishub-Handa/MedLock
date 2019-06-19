import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import { Button } from 'reactstrap';
import { editProfile, saveProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import '../../css/Profile.css';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileModules: props.profile.modules,
            newModule: null
        }

    }

    onPIButtonClick = () => {
        
    }

    profileModulesHTML = profileModules => {
        var merged = [].concat.apply([], profileModules);
        profileModules = merged;
        return profileModules.map(profileModule => (
            <ProfileModule name={profileModule.name} content={profileModule.content} editable={false} />
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
        const { profile, profileSaving, error, editable } = this.props;
        
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
            <div className="profile-container">
                <div className="main">
                    <div className="personalInfo-container">
                        <PersonalInfo profile={this.props.profile}/>
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
    profile: state.profileState.profile,
    editable: state.profileState.editable,
    profileLoading: state.profileState.profileLoading,
    profileSaving: state.profileState.profileSaving,
    error: state.profileState.error
})

export default connect(mapStateToProps, { editProfile, saveProfile })(Profile);