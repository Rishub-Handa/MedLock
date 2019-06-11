import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import bigLogo from '../../images/bigLogo.png'; 
import Login from '../Login';
import auth0client from '../../auth/Auth';

class DashHeader extends Component {
    
    onButtonClick = (e) => {
        auth0client.logout();
    }
    
    render() {
        return (
            <div>
                <div className="dash-container">
                    <img className="dash-logo" src={bigLogo} />
                    <h2>Some motivational quote</h2>
                    <p>First Last</p>
                    <img className="profile-picture" alt="Face"/>
                </div>
                <button onClick={this.onButtonClick}>Logout</button>
            </div>
        )
    }
}

export default DashHeader; 
