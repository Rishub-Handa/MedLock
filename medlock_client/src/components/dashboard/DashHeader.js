import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import bigLogo from '../../images/bigLogo.png'; 
import auth0client from '../../auth/Auth';

class DashHeader extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const { userProfile } = auth0client;
        return (
            <div>
                <div className="dash-container">
                    <img className="dash-logo" src={bigLogo} />
                    <h2>Some motivational quote</h2>
                    <h2>{this.props.name}</h2>
                    <img className="profile-picture" src='' alt="Face"/>
                </div>
            </div>
        )
    }
}

export default DashHeader; 
