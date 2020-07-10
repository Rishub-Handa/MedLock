import React, { Component } from 'react';
import UploadScreen from './UploadScreen';
import '../../css/Documents.css';
import { MEDLOCK_API } from '../../config/servers.js'; 
import { uploadDocuments, fetchDocuments, deleteDocument } from '../../actions/documentActions';
import { connect } from 'react-redux';
import auth0client from '../../auth/Auth';
import axios from 'axios';

class Documents extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // fetch patient documents when component has mounted
        this.props.fetchDocuments();
    }

    base64ToArrayBuffer = (base64) => {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    download = (documentName, documentId) => {
        // from : https://medium.com/@drevets/you-cant-prompt-a-file-download-with-the-content-disposition-header-using-axios-xhr-sorry-56577aa706d6
        console.log("download clicked");
        const { getAccessToken } = auth0client;
        const headers = {
            'Authorization': `Bearer ${getAccessToken()}`,
        };
        const API_URL = `${MEDLOCK_API}/patient/document/download`;
        // axios.post(API_URL, { documentId }, { headers })
        axios({
            method: 'POST',
            url: API_URL,
            data: { documentId },
            responseType: 'blob',
            headers: headers,
        })
            .then(response => {
                console.log(response);
                // var doc = response.data.document;
                // console.log(typeof doc.data);
                // console.log(doc.data);
                // console.log(response.data);
                // var bytes = this.base64ToArrayBuffer(doc.data);
                var blob = new Blob([response.data]); // , { encoding: doc.encoding, type: doc.mimetype });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', documentName);
                document.body.appendChild(link);
                link.click();
            });
        // axios({
        //     url: API_URL,
        //     method: 'GET',
        //     responseType: 'blob',
        //     headers: headers,
        // }).then((response) => {
        //     console.log(response);
        //     const url = window.URL.createObjectURL(new Blob([response.data]));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', 'file.pdf');
        //     document.body.appendChild(link);
        //     link.click();
        // });
    }

    render() {
        console.log(this.props);
        if (this.props.documentsFetching || !this.props.documents) {
            return (
                <div>Loading...</div>
            );
        }
        return (
            <div class="Documents">
                <h1 className="header">Documents</h1>
                <div>{this.documentsHTML()}</div>
                <UploadScreen documents={this.props.documents} uploadDocuments={this.props.uploadDocuments} />
                {/* <button onClick={this.download}>Download</button> */}
            </div>
        );
    }

    // return HTML for viewing a patient's already uploaded documents
    documentsHTML = () => {
        console.log(this.props.documents);
        if (this.props.documents.length > 0) {
            return this.props.documents.map(document => (
                <div className="document-view">
                    <p>{document.original_name}</p>
                    {this.props.documentDeleting ? <button disabled>Delete</button> : 
                    <button onClick={() => this.props.deleteDocument(document._id)}>Delete</button>}
                    <button onClick={() => this.download(document.original_name, document._id)}>Download</button>
                </div>
            ));
        } else {
            return (<div></div>)
        }
    }
}

const mapStateToProps = state => ({
    documentsUploading: state.documentState.documentsUploading,
    documents: state.documentState.documents,
    documentsUploadError: state.documentState.documentsUploadError,

    documentsFetching: state.documentState.documentsFetching,
    documentsFetchError: state.documentState.documentsFetchError,

    documentDeleting: state.documentState.documentDeleting,
    documentDeleteError: state.documentState.documentDeleteError
});

export default connect(mapStateToProps, {
    uploadDocuments,
    fetchDocuments,
    deleteDocument
})(Documents);
