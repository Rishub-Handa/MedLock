const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const IntakeSurveySchema = new Schema({
    responses: {
        type: Array 
    }, 
    date: {
        type: Date, 
        default: Date.now 
    }
}); 

module.exports = IntakeSurveySchema;