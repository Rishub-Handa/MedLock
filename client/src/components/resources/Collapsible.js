import React, { Component } from 'react';
import ReactGA from 'react-ga'; 

export default class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        ReactGA.event({
            category: 'Collapsible', 
            action: 'Resource Collapsible Toggled', 
            label: this.props.title
        })
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <div style={this.props.style} className={this.props.className}>
                <h4 onClick={(e) => this.togglePanel(e)} className='header'>
                    <strong>{this.props.title}</strong></h4>
                {
                    this.state.open ? (
                        <div className='content'>
                            {this.props.paragraph}
                        </div>
                    ) : null
                }
            </div >
        );
    }
}