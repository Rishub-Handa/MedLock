import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../nav/history';
import '../../css/DashIcon.css';

/**
 * Class Component for displaying info about the 
 * module it represents. When clicked, the correspoding
 * module is loaded. 
 */
class DashIcon extends Component {
    
    /**
     * Function that reroutes to corresponding page. Called 
     * when the DashIcon is clicked.
     */
    route = (e) => {
        history.replace(this.props.link);
    };
    
    render() {
        return (
            <div className="icon" onClick={this.route}>
                <h1>{this.props.name}</h1>
                <div>
                    <img src={this.props.content.image} />
                    <p>{this.props.content.description}</p>
                </div>
            </div>
        );
    }
}

DashIcon.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired
}

export default DashIcon;
