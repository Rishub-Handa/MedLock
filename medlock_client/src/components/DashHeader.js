import React, { Component } from 'react'; 
import '../css/DashHeader.css'; 
import bigLogo from '../images/bigLogo.png'; 

class DashHeader extends Component {
    render() {
        return (
            <div>
                <div className="dash-container">
                    <img className="dash-logo" src={bigLogo} />
                    <h2>Some motivational quote</h2>
                    <p>FirstName LastName</p>
                    <img className="profile-picture" alt="Face"/>
                </div>
            </div>
        )
    }
}

export default DashHeader; 
