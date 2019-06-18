import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import { Button } from 'reactstrap';
import '../../css/Profile.css';

class Profile extends Component {

    constructor(props) {
        super(props);
        console.log(props.profile.modules);
        this.state = {
            profileModules: props.profile.modules
        }

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
        const { profile } = this.props;
        
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

export default Profile;