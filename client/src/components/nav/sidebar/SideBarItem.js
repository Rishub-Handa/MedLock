import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class SideBarItem extends Component {
    render() {
        return (
            <div className="SideBarItem" >
                <Button
                    onClick={() => {
                        this.props.history.push(this.props.module.link)
                    }}
                >{this.props.module.name}</Button>
            </div>
        )
    }
}
