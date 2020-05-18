const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const ExitSurveySchema = new Schema({
    responses: {
        type: Array 
    }, 
    date: {
        type: Date, 
        default: Date.now 
    }
}); 

module.exports = ExitSurveySchema;