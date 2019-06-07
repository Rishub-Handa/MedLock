const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

// Create Response Schema 

const ResponseSchema = new Schema({
    family: {
        type: Number, 
        required: true 
    }, 
    recreation: {
        type: Number, 
        required: true 
    }, 
    socialActivity: {
        type: Number, 
        required: true 
    }, 
    occupation: {
        type: Number, 
        required: true 
    }, 
    sexualBehavior: {
        type: Number, 
        required: true 
    }, 
    selfCare: {
        type: Number, 
        required: true 
    }, 
    lifeSupportActivities: {
        type: Number, 
        required: true 
    } 
}); 

// Create PDISurvey Schema 

const PDISurveySchema = new Schema({
    responses: {
        type: Array 
    }, 
    date: {
        type: Date, 
        default: Date.now 
    }
}); 

module.exports = PDISurvey = mongoose.model('pdisurvey', PDISurveySchema); 

