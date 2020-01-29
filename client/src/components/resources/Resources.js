import React, { Component } from 'react';
import '../../css/Resources.css';

class Resources extends Component {
    render() {
        return (
            <div className="Resources-container">
                <h1 style={{marginBottom: "20px"}} class="header">Resources</h1>
                <div style={{backgroundImage: "linear-gradient(to bottom, #51bfcb, #2095d8)"}} className="module-container">
                    <h4><strong>Managing Pain</strong></h4>
                    <p>We understand that pain may affect every aspect of your life.
                    By understanding your pain, you may learn to better manage it.</p>
                </div>
                <div style={{backgroundImage: "linear-gradient(to bottom, #5f82cc, #2057d8)"}} className="module-container">
                    <h4><strong>Understanding Drugs</strong></h4>
                    <p>We understand that pain may affect every aspect of your life.
                    By understanding your pain, you may learn to better manage it.</p>
                </div>
                <div style={{backgroundImage: "linear-gradient(to bottom, #b351cb, #9d3cb1)"}} className="module-container">
                    <h4><strong>Monitoring Mental Health</strong></h4>
                    <p>We understand that pain may affect every aspect of your life.
                    By understanding your pain, you may learn to better manage it.</p>
                </div>
                <div style={{backgroundImage: "linear-gradient(to bottom, #cba151, #d8a620)"}} className="module-container">
                    <h4><strong>Maintaining General Life</strong></h4>
                    <p>We understand that pain may affect every aspect of your life.
                    By understanding your pain, you may learn to better manage it.</p>
                </div>
                <div style={{backgroundImage: "linear-gradient(to bottom, #68cb51, #61c694)"}} className="module-container">
                    <h4><strong>Building Community Support</strong></h4>
                    <p>We understand that pain may affect every aspect of your life.
                    By understanding your pain, you may learn to better manage it.</p>
                </div>
                <div style={{backgroundImage: "linear-gradient(to bottom, #c56358, #d86320)"}} className="module-container">
                    <h4><strong>EMERGENCY RESPONSE</strong></h4>
                    <p>We understand that pain may affect every aspect of your life.
                    By understanding your pain, you may learn to better manage it.</p>
                </div>
            </div>
        );
    }
}

export default Resources;

