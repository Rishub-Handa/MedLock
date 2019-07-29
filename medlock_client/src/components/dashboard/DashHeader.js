import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import UserInfo from './UserInfo';
import bigLogo from '../../images/bigLogo.png'; 



class DashHeader extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="DashHeader">
                <div className="logo-container">
                    <img className="dash-logo" src={bigLogo} />
                </div>
                <div className="quote">
                    <p>"You never know how strong you are until being strong is your only choice."</p>
                </div>
                <div className="UserInfo-container">
                    <UserInfo name={this.props.name} />
                </div>
            </div>
        )
    }
}

export default DashHeader; 
