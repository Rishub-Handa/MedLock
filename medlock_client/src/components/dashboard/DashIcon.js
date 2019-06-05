import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../../nav/history';

class DashIcon extends Component {
    

    route = (e) => {
        history.replace(this.props.link);
    };
    
    render() {
        console.log(this.props.link);
        return (
            <div className="DashIcon-container" style={dashIconStyle} onClick={this.route}>
                <h1>{this.props.name}</h1>
                <div>
                    <img src={this.props.content.image} />
                    <p>{this.props.content.description}</p>
                </div>
                
                
            </div>
        );
    }
}

const dashIconStyle = {
    border: '1px solid #ccc'
}

DashIcon.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired
}

export default DashIcon;
