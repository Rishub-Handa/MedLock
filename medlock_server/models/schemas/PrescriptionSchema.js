const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

// Create Prescription Schema 
const PrescriptionSchema = new Schema({
    description: {
        type: String
    },
    pillsPerDay: {
        type: Number
    },
    date: {
        type: Date
    }
}); 

module.exports = PrescriptionSchema;