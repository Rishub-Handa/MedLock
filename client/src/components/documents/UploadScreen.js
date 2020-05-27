import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
// won't need the following 3 imports after switch to redux for this comp.
import auth0client from '../../auth/Auth';
import { MEDLOCK_API, MEDLOCK_AUTH0 } from '../../config/servers';
import axios from 'axios';
var _ = require('lodash');
// not sure if I will need the 3 imports below because they seem to only relate to style
// keeping them for now while I follow the article
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
// import FontIcon from 'material-ui/FontIcon';
// import {blue500, red500, greenA200 } from 'material-ui/styles/colors';

// document upload taken from: https://medium.com/technoetics/handling-file-upload-in-reactjs-b9b95068f6b
export default class UploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesToBeSent: [],
            filesSent: [],
            uploadCount: 10,
        }
    }

    // appends acceptedFiles to filesToBeSent in component state
    onDrop = (acceptedFiles) => {
        console.log("onDrop");
        var filesToBeSent = this.state.filesToBeSent;
        if (filesToBeSent.length < this.state.uploadCount) {
            filesToBeSent.push(acceptedFiles); 
            this.setState({ filesToBeSent });
        } else {
            alert('You have reached the limit of uploading files at a time.');
        }
    }

    filesToBeSentPreviewHTML = () => {
        console.log("filesPreviewHTML");
        var filesToBeSent = this.state.filesToBeSent;
        var filesPreview = [];
        for (var i in filesToBeSent) {
            filesPreview.push(
                <div className="filePreview">
                    {filesToBeSent[i][0].name}
                    <button onClick={() => this.clear(i)}>clear</button>
                </div>
            );
        }
        return filesPreview;
    }

    filesSentPreviewHTML = () => {
        var filesSent = this.state.filesSent;
        var filesPreview = [];
        for (var i in filesSent) {
            filesPreview.push(
                <div className="filePreview">
                    {filesSent[i][0].name}
                </div>
            );
        }
        return filesPreview;
    }

    // @param i : index of file
    // @desc : remove image at index i from filesToBeSent in component state
    clear = (index) => {
        var filesToBeSent = _.remove(this.state.filesToBeSent, (d, i) => {
            return i != index;
        });
        this.setState({ filesToBeSent });
    }

    upload = () => {
        var { filesToBeSent, filesSent } = this.state;
        var promise = this.props.uploadDocuments(filesToBeSent);

        // on successful upload, add files in filesToBeSent to filesSent
        for (var i in filesToBeSent) {
            filesSent.push(filesToBeSent[i]);
        }
        this.setState({
            ...this.state,
            filesToBeSent: [],
            filesSent,
        });
    }

    render() {
        return (
            <div className="UploadScreen">
                <Dropzone onDrop={(files) => this.onDrop(files)}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className="dropZone">
                            <input {...getInputProps()} />
                            <p>drag 'n' drop some files here, or click to select files</p>
                        </div>
                    )}
                </Dropzone>
                <div>
                    Files to be uploaded are: {this.filesToBeSentPreviewHTML()}
                </div>
                <div>
                    Files uploaded successfully: {this.filesSentPreviewHTML()}
                </div>
                <button onClick={this.upload}>Upload</button>
            </div>
        );
    }
}


