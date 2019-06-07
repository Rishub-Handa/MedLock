import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileModule extends Component {
    
    render() {
        return (
            <div>
                <div>
                    <h3>{this.props.question}</h3>
                </div>
                <div>
                    <h4>{this.props.answer}</h4>
                </div>
            </div>
        );
    }
}

ProfileModule.propTypes = {
    quesion: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
}

export default ProfileModule;
