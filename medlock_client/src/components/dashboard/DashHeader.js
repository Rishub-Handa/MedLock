import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import UserInfo from './UserInfo';
import bigLogo from '../../icons/white-logo.png'; 
import menuIcon from '../../icons/round-menu-24px.svg';



class DashHeader extends Component {
    
    constructor(props) {
        super(props);
    }

    collapsedSideBar = () => {
        return (
            <div className="SideBarToggle" onClick={this.props.expandSideBar}>
                <img className="menuIcon" src={menuIcon} />
            </div>
        )
    }

    logo = () => {
        return (
            <div className="logo-container">
                <img className="dash-logo" src={bigLogo} />
            </div>
        )
    }

    render() {
        return (
            <div className="DashHeader">
                {
                    this.props.collapsed ? this.collapsedSideBar() : this.logo()
                }
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
