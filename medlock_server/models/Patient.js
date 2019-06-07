const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const PatientSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    profile: {
        name: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        }
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);