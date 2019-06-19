import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input } from 'reactstrap';

/**
 * Component to display personal info on the profile page.
 */

class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                name: this.props.profile.name,
                bio: this.props.profile.bio
            }
        };
    }

    editableHTML = () => {
        return (
            <div className="personalInfo-editable">
                <Form>
                    <FormGroup>
                        <Input type="text" name="name" id="pi-name" placeholder="Name" value={this.state.name} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="date" name="dob" id="pi-dob" placeholder="Birthday" value={this.state.birthday} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="bio" id="pi-bio" placeholder="Bio" value={this.state.bio} onChange={this.onChange} />
                    </FormGroup>
                </Form>
            </div>
        )
    }

    onButtonClick = () => {
        if (this.props.editable) {
            console.log("Saving Profile...")
            var newName = document.getElementById('name').innerText;
            var newBio = document.getElementById('bio').innerText;
            console.log(newName);
            console.log(newBio);
            this.props.saveProfile({newName, newBio});
        } else {
            console.log("Editing Profile...")
            this.props.editProfile();
        }
    }

    onBioChange = (e) => {
        var newBio = document.getElementById('bio').innerText;
        console.log(newBio);
        //this.setState({profile: {bio: newBio}});
        console.log(this.state);
    }

    
    render() {

        const { profile, loading, error, editable } = this.props;

      
        // } else if (!loading && profile.name && profile.bio) {
        //     this.setState({profile: {name: user.name, bio: user.bio }});
        // }

        return (    
            <div>
                <div>
                    <img src='' alt='Profile Picture' />
                </div>
                <div>
                    <h1 id='name' contentEditable={editable}>{this.state.profile.name}</h1>
                </div>
                <div>
                    <h3>Biography</h3>
                    <p id='bio' contentEditable={editable} onChange={this.onBioChange}>{this.state.profile.bio}</p>
                </div>
                <div>
                    <button onClick={this.onButtonClick}>
                        {
                            editable ? "Save" : "Edit"
                        }
                    </button>
                </div>
            </div>
        )
    }
}

PersonalInfo.propTypes = {
    editProfile: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    editable: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profileState.profile,
    editable: state.profileState.editable,
    loading: state.profileState.loading,
    error: state.profileState.error
})

export default connect(mapStateToProps, { editProfile, saveProfile })(PersonalInfo);
