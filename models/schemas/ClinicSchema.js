const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = ClinicSchema;