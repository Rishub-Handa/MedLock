const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

// Create PDISurvey Schema 

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

module.exports = PDISurvey = mongoose.model('pdisurvey', PDISurveySchema); 

