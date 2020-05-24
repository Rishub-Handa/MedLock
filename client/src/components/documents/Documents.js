import React, { Component } from 'react';
import UploadScreen from './UploadScreen';
import '../../css/Documents.css';

export default class Documents extends Component {
    render() {
        return (
            <div class="Documents">
                <p>Welcome to the Documents Page.</p>
                <UploadScreen />
            </div>
        );
    }
}
