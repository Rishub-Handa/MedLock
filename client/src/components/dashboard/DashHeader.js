import React, { Component } from 'react'; 
import '../../css/DashHeader.css'; 
import bigLogo from '../../icons/white-logo.png'; 
import UserInfo from './UserInfo';
import AddDispenser from './AddDispenser'; 
import menuIcon from '../../icons/round-menu-24px.svg';
import PropTypes from 'prop-types';

// TODO: Develop logic to display or hide Add Dispenser button by role and registration 

class DashHeader extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.roles); 
    }

    collapsedSideBarJSX = () => {
        return (
            <div className="DashHeader" >
                <div className="menuIcon-container collapsed" onClick={this.props.toggleSideBar}>
                    <img className="menuIcon" src={menuIcon} />
                </div>
                <div className="quote">
                    <body>
                        <p>"You never know how strong you are until being strong is your only choice."</p>
                    </body>
                </div>
                {
                    this.props.roles[0].name == "Patient" && (
                        <div className="AddDispenser-container">
                            <AddDispenser displayCodeCallback={this.props.displayDispenserCode} /> 
                        </div>
                    )
                }
                <div className="UserInfo-container">
                    <UserInfo name={this.props.name} />
                </div>
            </div>
        );
    }

    expandedSideBarToggleJSX = () => {
        return (
            <div className="DashHeader" >
                <div className="menuIcon-container expanded" onClick={this.props.toggleSideBar}>
                    <img className="menuIcon" src={menuIcon} />
                </div>
                {
                    this.props.roles[0].name == "Patient" && (
                        <div className="AddDispenser-container">
                            <AddDispenser displayCodeCallback={this.props.displayDispenserCode} /> 
                        </div>
                    )
                }
                <div className="UserInfo-container">
                    <UserInfo name={this.props.name} />
                </div>
            </div>
        )
    }

    expandedSideBarNoToggleJSX = () => {
        return (
            <div className="DashHeader" >
                <div></div>
                <div className="quote">
                    <body>
                        <p>"You never know how strong you are until being strong is your only choice."</p>
                    </body>
                </div>
                {
                    this.props.roles[0].name == "Patient" && (
                        <div className="AddDispenser-container">
                            <AddDispenser displayCodeCallback={this.props.displayDispenserCode} /> 
                        </div>
                    )
                }
                <div className="UserInfo-container">
                    <UserInfo name={this.props.name} />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="DashHeader">
                {
                    this.props.roles[0].name == "Patient" && (
                        <div className="AddDispenser-container">
                            <AddDispenser displayCodeCallback={this.props.displayDispenserCode} /> 
                        </div>
                    )
                }
                <div className="UserInfo-container">
                    <UserInfo name={this.props.name} />
                </div>
            </div>
        )
        // if (this.props.sideBarCollapsed) {
        //     return this.collapsedSideBarJSX();

        // } else if (this.props.sideBarToggle) { //expanded and able to toggle
        //     return this.expandedSideBarToggleJSX();
        // } else { //expanded and unable to toggle
        //     return this.expandedSideBarNoToggleJSX();
        // }
    }
}

DashHeader.propTypes = {
    displayDispenserCode: PropTypes.func.isRequired
}

export default DashHeader; 
