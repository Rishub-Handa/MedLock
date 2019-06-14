const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const PatientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);