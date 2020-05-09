import React, { Component } from 'react';
import infoIcon from '../../../icons/003-info.svg';
import history from '../history';
import ReactGA from 'react-ga'; 

export default class ModuleLink extends Component {
    
    route = () => {
        ReactGA.event({
            category: 'Sidebar Click', 
            action: 'Navigated to ' + this.props.module.name + ' from Sidebar', 
            label: 'Click ' + this.props.module.name + ' from Sidebar'
        }); 
        history.push(this.props.module.link);
    }
    
    render() {
        return (
            <div className="ModuleLink" onClick={this.route}>
                <div>
                    <img className="ModuleLink-icon" src={this.props.module.content.icon} />
                </div>
                <div className="ModuleLink-name">
                    <p>{this.props.module.name}</p>
                    {/* <button className="SideBarButton"
                        onClick={() => {
                            this.props.history.push(this.props.module.link)
                        }}
                    >{this.props.module.name}</button> */}
                </div>
                <div>
                    <img src='' />
                </div>
            </div>
        )
    }
}
