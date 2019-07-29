import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import auth0client from '../../auth/Auth';

class DashHeader extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const { userProfile } = auth0client;
        return (
            <div className="DashHeader">
                <div className="quote">
                    <p>Some motivational quote</p>
                </div>
                <div className="DashHeader-UserInfo">
                    <h2>{this.props.name}</h2>
                    <img className="profile-picture" src='' alt="Face"/>
                </div>
            </div>
        )
    }
}

export default DashHeader; 
