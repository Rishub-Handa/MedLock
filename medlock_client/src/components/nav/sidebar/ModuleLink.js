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
                <div>
                    <h6>{this.props.module.name}</h6>
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
