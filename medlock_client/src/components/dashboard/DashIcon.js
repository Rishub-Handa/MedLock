import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../nav/history';
import '../../css/DashIcon.css'; 
import ReactGA from 'react-ga'; 

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
        
        console.log("Dash Icon Route. "); 
        ReactGA.event({
            category: 'Dash Icon Click', 
            action: 'Navigated to ' + this.props.name + ' from Dash', 
            label: 'Click ' + this.props.name + ' from Dash'
        }); 
        history.replace(this.props.link);
    };
    
    render() {
        return (
            /* <div className={`${this.props.id}-dashIcon`} onClick={this.route}> */
            <div className="DashIcon" onClick={this.route} style={{cursor:'pointer'}}>
                <div>
                    <p>{this.props.name}</p>
                </div>
                <div>
                    <img src={this.props.content.image} />
                    <p>{this.props.roles.description}</p>
                </div>
            </div>
        );
    }
}

DashIcon.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired, 
    roles: PropTypes.array.isRequired, 
    link: PropTypes.string.isRequired
}

export default DashIcon;
