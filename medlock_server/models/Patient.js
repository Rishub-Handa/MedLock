const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PDISurveySchema = require('./schemas/PDISurveySchema'); 
const DispenserSchema = require('./schemas/DispenserSchema');
const PrescriptionSchema = require('./schemas/PrescriptionSchema');
const ProviderInfoSchema = require('./schemas/ProviderInfoSchema');

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
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
        },
        chatname: {
            type: String,
            default: this.name
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
        dispenser: DispenserSchema,
        prescription: PrescriptionSchema,
        providers: [ProviderInfoSchema]
    },
    todos: {
        appointments: [],
        reminders: []
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);