const mongoose = require('mongoose'); 
const ExitSurveySchema = require('./schemas/ExitSurveySchema');

module.exports = ExitSurvey = mongoose.model('exitSurvey', ExitSurveySchema); 