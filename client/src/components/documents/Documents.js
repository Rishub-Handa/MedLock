import React, { Component } from 'react';
import UploadScreen from './UploadScreen';
import '../../css/Documents.css';

import { uploadDocuments } from '../../actions/documentActions';
import { connect } from 'react-redux';

class Documents extends Component {
    render() {
        return (
            <div class="Documents">
                <h1 className="header">Documents</h1>
                <UploadScreen documents={this.props.documents} uploadDocuments={this.props.uploadDocuments} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    documentsUploading: state.documentState.documentsUploading,
    documents: state.documentState.documents,
    documentsUploadError: state.documentState.documentsUploadError,
});

export default connect(mapStateToProps, {
    uploadDocuments,
})(Documents);
