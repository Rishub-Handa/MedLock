const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PDISurveySchema = require('./schemas/PDISurveySchema'); 
const PrescriptionSchema = require('./schemas/PrescriptionSchema');
//const ProviderInfoSchema = require('./schemas/ProviderInfoSchema');

// Create Patient Schema 
const PatientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    personalData: {
        name: {
            type: String,
            required: true
        },
        sex: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        address: {
            type: Object,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        chatname: {
            type: String,
        },
        bio: {
            type: String
        }
    },
    medicalData: {
        surveys: {
            pdiSurveys: [PDISurveySchema],
            painSurveys: {
                type: Array
            }
        },
        dispenser_id: Schema.Types.ObjectId,
        prescription: PrescriptionSchema,
        providers: []
    },
    todos: {
        appointments: [],
        reminders: []
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);