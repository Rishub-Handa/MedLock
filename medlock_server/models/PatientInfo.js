const mongoose = require('mongoose'); 
const PDISurveySchema = require('./schemas/PatientInfoSchema');

module.exports = PDISurvey = mongoose.model('patientInfo', PatientInfoSchema); 