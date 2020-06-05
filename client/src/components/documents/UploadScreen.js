import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
// won't need the following 3 imports after switch to redux for this comp.
import auth0client from '../../auth/Auth';
import { MEDLOCK_API, MEDLOCK_AUTH0 } from '../../config/servers';
import axios from 'axios';
var _ = require('lodash');
var request = require('superagent');
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
            readingFiles: false,
            fileData: [],
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

    readFiles = () => {
        console.log("reading files");
        // fileData = array of file contents, ith position holds binary data of ith file in filesToBeSent
        var { filesToBeSent, fileData } = this.state;
        var reader = new FileReader();

        var i = 0; // starting index
        var numFiles = filesToBeSent.length; // number of files
        console.log(numFiles);

        const readFile = (index) => {
            console.log(`reading file(index=${index})`);
            var curFile = filesToBeSent[index][0];
            reader.readAsArrayBuffer(curFile);
        };

        reader.onload = () => {
            console.log(`finished reading file(index=${i})`);
            fileData.push({ name: filesToBeSent[i][0].name, data: reader.result }); // may need to cast to Blob 
            console.log(fileData);
            i = i + 1;
            if (i < numFiles) {
                readFile(i);
            } else {
                this.setState({
                    ...this.state,
                    readingFiles: false,
                    fileData,
                }, () => {
                    this.props.uploadDocuments(this.state.fileData);
                });
            }
        }

        reader.onerror = () => {
            console.log(`error reading file(index=${i})`);
        }

        readFile(0); // start loop by reading first file
    }

    upload = () => {
        // works but not with Redux
        var filesArray = this.state.filesToBeSent;

        // creates POST request to upload documents to server
        this.props.uploadDocuments(filesArray)
            .then(() => { // after successfully uploading documents, reset filesToBeSent
                this.setState({ 
                    ...this.state,
                    filesToBeSent: [],
                })
            });
    }

    render() {
        console.log(this.state);
        console.log(this.props);
        return (
            <div className="UploadScreen">
                {/* HTML for drag 'n' drop area. */}
                <Dropzone onDrop={(files) => this.onDrop(files)}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className="dropZone">
                            <input {...getInputProps()} />
                            <p>Drag and drop files here, <br />OR <br />Click to select files</p>
                        </div>
                    )}
                </Dropzone>
                <div class="bodyText-single">
                    Files to be uploaded are: {this.filesToBeSentPreviewHTML()}
                </div>
                <div class="bodyText-single">
                    Files uploaded successfully: {this.filesSentPreviewHTML()}
                </div>
                {/* Upload button is disabled if no files have been selected. */}
                { this.state.filesToBeSent.length > 0 ? 
                    <button onClick={this.upload}>Upload</button> :
                    <button disabled>Upload</button> 
                }
            </div>
        );
    }
}


