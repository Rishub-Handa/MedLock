import React, { Component } from 'react';
import infoIcon from '../../../icons/003-info.svg';
import history from '../history';


export default class ModuleLink extends Component {
    
    route = () => {
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
