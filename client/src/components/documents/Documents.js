import React, { Component } from 'react';
import UploadScreen from './UploadScreen';
import '../../css/Documents.css';

import { uploadDocuments, fetchDocuments, deleteDocument } from '../../actions/documentActions';
import { connect } from 'react-redux';

class Documents extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // fetch patient documents when component has mounted
        this.props.fetchDocuments();
    }

    render() {
        if (this.props.documentsFetching) {
            return (
                <div>Loading...</div>
            )
        }
        console.log(this.props.documents);
        return (
            <div class="Documents">
                <h1 className="header">Documents</h1>
                <div>{this.documentsHTML()}</div>
                <UploadScreen documents={this.props.documents} uploadDocuments={this.props.uploadDocuments} />
            </div>
        );
    }

    // return HTML for viewing a patient's already uploaded documents
    documentsHTML = () => {
        return this.props.documents.map(document => (
            <div className="document-view">
                <p>{document.name}</p>
                <div class="two-btn">
                    {this.props.documentDeleting ? <button class="create-new-btn" disabled>Delete</button> :
                        <button class="delete-btn" onClick={() => this.props.deleteDocument(document._id)}>Delete</button>}
                    <button class="create-new-btn">Download</button>
                </div>
            </div>
        ));
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
