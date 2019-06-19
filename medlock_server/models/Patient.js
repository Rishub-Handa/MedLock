const mongoose = require('mongoose');
// const PDISurvey = require('./PDISurvey'); 
const Schema = mongoose.Schema;

// Export this to patients.js ??? 
const PDISurveySchema = new Schema({
    ownerId: {
        type: String
    },
    responses: {
        type: Array 
    }, 
    date: {
        type: Date, 
        default: Date.now 
    }
}); 

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
    },
    dispenser_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    surveys: {
        pdiSurveys: {
            type: [PDISurveySchema] 
        }
    }, 
    modules: {
        type: Schema.Types.Array,
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);