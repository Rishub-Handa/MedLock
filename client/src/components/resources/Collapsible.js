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

    togglePanel = (e) => {
        
        ReactGA.event({
            category: 'Collapsible', 
            action: 'Resource Collapsible Toggled', 
            label: e.target.innerText
        });
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div style={this.props.style} className={this.props.className}>
                <h6 onClick={this.togglePanel} className='header'>
                    <strong>{this.props.title}</strong></h6>
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