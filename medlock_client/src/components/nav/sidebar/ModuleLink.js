import React, { Component } from 'react';
import infoIcon from '../../../icons/003-info.svg';

export default class ModuleLink extends Component {
    render() {
        return (
            <div className="ModuleLink">
                <div>
                    <img src={this.props.module.icon} />
                </div>
                <div>
                    <button className="SideBarButton"
                        onClick={() => {
                            this.props.history.push(this.props.module.link)
                        }}
                    >{this.props.module.name}</button>
                </div>
                <div>
                    <img src='' />
                </div>
            </div>
        )
    }
}
