import React, { Component } from 'react';
import { editProfile, saveProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            )
        }

        if (loading) {
            return (
                <div>
                    Saving profile . . .
                </div>
            )
        }
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
