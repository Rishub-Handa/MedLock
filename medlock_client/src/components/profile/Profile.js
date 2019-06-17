import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileModule from './ProfileModule';
import { Button } from 'reactstrap';
import '../../css/Profile.css';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.addProfileModule = this.addProfileModule.bind(this);
        this.state = {
            profileModules: [
                {
                    name: "Home Town",
                    content: "Purcellville, VA",
                    editable: false
                },
                {
                    name: "Inspirational Quote",
                    content: "Be who you are and say what you feel, because in the end those who matter don't mind and those that mind don't matter.",
                    editable: false
                }
            ]
        }

    }

    profileModulesHTML = profileModules => {
         return profileModules.map(profileModule => (
             <ProfileModule name={profileModule.name} content={profileModule.content} editable={profileModule.editable} />
         ));
    };
    

    addProfileModule() {

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