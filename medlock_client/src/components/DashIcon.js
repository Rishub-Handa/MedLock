import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DashIcon extends Component {
    render() {
        return (
            <div style={dashIconStyle}>
                <h1>{this.props.name}</h1>
                <br />
                <div>
                    <img src={this.props.content.image} />
                    <p>{this.props.content.description}</p>
                </div>
            </div>
        );
    }
}

const dashIconStyle = {
    border: 'thin'
}

DashIcon.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
}

export default DashIcon;
