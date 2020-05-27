import React, { Component } from 'react';
import UploadScreen from './UploadScreen';
import '../../css/Documents.css';

export default class Documents extends Component {
    render() {
        return (
            <div class="Documents">
                <h1 className="header">Documents</h1>
                <UploadScreen />
            </div>
        );
    }
}
