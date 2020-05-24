import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
// won't need the following 3 imports after switch to redux for this comp.
import auth0client from '../../auth/Auth';
import { MEDLOCK_API, MEDLOCK_AUTH0 } from '../../config/servers';
import axios from 'axios';
// not sure if I will need the 3 imports below because they seem to only relate to style
// keeping them for now while I follow the article
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200 } from 'material-ui/styles/colors';

// document upload taken from: https://medium.com/technoetics/handling-file-upload-in-reactjs-b9b95068f6b
export default class UploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesPreview: [],
            filesToBeSent: [],
            printCount: 10,
        }
    }

    // appends acceptedFiles to filesToBeSent in component state
    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        var filesToBeSent = this.state.filesToBeSent;
        if (filesToBeSent.length < this.state.printCount) {
            filesToBeSent.push(acceptedFiles); 
            var filesPreview = [];
            for (var i in filesToBeSent) {
                filesPreview.push(
                    <div>
                        {filesToBeSent[i][0].name}
                        <MuiThemeProvider>
                            <a href='#'>
                                <FontIcon className="material-icons customstyle" color={blue500} styles={{ top:10, }}>clear</FontIcon>
                            </a>
                        </MuiThemeProvider>
                    </div>
                );
            }
            this.setState({ filesToBeSent, filesPreview });
        } else {
            alert('You have reached the limit of printing files at a time.');
        }
    }

    upload = () => {
        console.log("upload clicked");
        const { getAccessToken } = auth0client;
        let API_URL = `${MEDLOCK_API}/patient/documents`;
        const headers = {
            'Authorization': `Bearer ${getAccessToken()}`
        };
        axios.post(API_URL, { data: this.state.filesToBeSent }, { headers });
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
                    Files to be printed are: {this.state.filesPreview}
                </div>
                <button onClick={this.upload}>Upload</button>
            </div>
        );
    }
}
