import React, { Component } from 'react';

/**
 * Component to display personal info on the profile page.
 */

class PersonalInfo extends Component {
    render() {
        return (
            <div>
                <div>
                    <img src='' alt='Profile Picture' />
                </div>
                <div>
                    <h1 contentEditable={this.props.editable}>{this.props.user.name}</h1>
                </div>
                <div>
                    <h3>Biography</h3>
                    <p contentEditable={this.props.editable}>{this.props.user.bio}</p>
                </div>
            </div>
        )
    }
}

export default PersonalInfo;
