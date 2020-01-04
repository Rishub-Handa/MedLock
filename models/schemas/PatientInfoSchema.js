const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = require('./PrescriptionSchema');

// Create PatientInfo Schema
// The information about patients stored by providers. 
const PatientInfoSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        required: true 
    }, 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // Risk scores and other metrics to evaluate the patient. 
    evaluationData: {
        type: Object 
    },
    prescriptionData: [
        {
            originalPrescription: PrescriptionSchema,
            changes: [PrescriptionSchema]
        }
    ]
}); 

module.exports = PatientInfoSchema;