import React, { Component } from 'react';
import { editProfile, saveProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from "uuid";

/**
 * Component to display personal info on the profile page.
 */

class PersonalInfo extends Component {

    state = {
        profile: {
            _id: this.props.authProfile.userId,
            name: this.prop.authProfile.name,
            bio: "default bio"
        }
    };

    onButtonClick = () => {
        if (this.props.editable) {
            console.log("Saving Profile...")
            var name = document.getElementById('name').innerText;
            var bio = document.getElementById('bio').innerText;
            this.props.saveProfile({
                _id: this.state.profile._id,
                name: name,
                bio: bio
            });
        } else {
            console.log("Editing Profile...")
            this.props.editProfile();
        }
    }

    
    render() {

        console.log(this.props.authProfile);

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
                    <img src={this.props.authProfile.picture} alt='Profile Picture' />
                </div>
                <div>
                    <h1 id='name' contentEditable={editable}>{this.state.profile.name}</h1>
                </div>
                <div>
                    <h3>Biography</h3>
                    <p id='bio' contentEditable={editable}>{this.state.profile.bio}</p>
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

export default connect(mapStateToProps, { editProfile, saveProfile})(PersonalInfo);
