import React, { Component } from 'react';

export default class DashIcon extends Component {
    render() {
        return (
            <div style={dashIconStyle}>
                <h1>{this.props.name}</h1>
                <br />
                <div>
                    {this.props.content}
                </div>
            </div>
        );
    }
}

const dashIconStyle = {
    border: 'thin'
}
