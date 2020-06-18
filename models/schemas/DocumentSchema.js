const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    original_name: {
        type: String,
        required: true,
    },
    file_name: {
        type: String,
        required: true,
    },
    data: {
        type: Schema.Types.Buffer,
        required: true,
    },
    encoding: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    }

});

module.exports = DocumentSchema;