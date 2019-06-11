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
        user: {
            _id: '',
            name: this.props.userProfile.name,
            bio: "40 years old. Proud former hoo. Born and raised in Centreville, VA."
        }
    }
    onButtonClick = () => {
        if (this.props.editable) {
            console.log("Saving Profile...")
            var _id = uuid.v4();
            var name = document.getElementById('name').innerText;
            var bio = document.getElementById('bio').innerText;
            this.props.saveProfile({
                _id: _id,
                profile: {
                    name: name,
                    bio: bio,
                }
            });
        } else {
            console.log("Editing Profile...")
            this.props.editProfile();
        }
    }

    
    render() {
        console.log(this.props);
        return (
            <div>
                <div>
                    <img src='' alt='Profile Picture' />
                </div>
                <div>
                    <h1 id='name' contentEditable={this.props.editable} onChange={this.onChange}>{this.props.userProfile.name}</h1>
                </div>
                <div>
                    <h3>Biography</h3>
                    <p id='bio' contentEditable={this.props.editable} onChange={this.onChange}>{this.props.user.bio}</p>
                </div>
                <div>
                    <button onClick={this.onButtonClick}>
                        {
                            this.props.editable ? "Save" : "Edit"
                        }
                    </button>
                </div>
            </div>
        )
    }
}

PersonalInfo.propTypes = {
    editProfile: PropTypes.func.isRequired,
    editable: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.profileState.user,
    editable: state.profileState.editable
})

export default connect(mapStateToProps, { editProfile, saveProfile})(PersonalInfo);
