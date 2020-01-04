const mongoose = require('mongoose'); 
const PDISurveySchema = require('./schemas/PDISurveySchema');

module.exports = PDISurvey = mongoose.model('pdisurvey', PDISurveySchema); 