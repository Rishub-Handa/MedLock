const mongoose = require('mongoose'); 
const IntakeSurveySchema = require('./schemas/IntakeSurveySchema');

module.exports = IntakeSurvey = mongoose.model('intakeSurvey', IntakeSurveySchema); 