const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    data: {
        type: Schema.Types.Buffer,
        required: true,
    }
});

module.exports = DocumentSchema;