const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

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

module.exports = PDISurveySchema;