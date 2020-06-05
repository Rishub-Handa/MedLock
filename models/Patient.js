const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PDISurveySchema = require('./schemas/PDISurveySchema'); 
const IntakeSurveySchema = require('./schemas/IntakeSurveySchema'); 
const ExitSurveySchema = require('./schemas/ExitSurveySchema'); 
const PrescriptionSchema = require('./schemas/PrescriptionSchema');
const CheckInSchema = require('./schemas/CheckInSchema'); 
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
            intakeSurvey: [IntakeSurveySchema], 
            exitSurvey: [ExitSurveySchema], 
            painSurveys: {
                type: Array
            }
        },
        dispenser_id: Schema.Types.ObjectId,
        dispenserCode: {
            type: Array 
        }, 
        prescription: PrescriptionSchema,
        clinic: {
            type: Schema.Types.ObjectId,
        },
        providers: [{
            type: Schema.Types.ObjectId,
        }], 
        checkIns: [CheckInSchema]
    },
    todos: {
        appointments: [],
        reminders: []
    },
    documents: [],
});

module.exports = Patient = mongoose.model('patient', PatientSchema);