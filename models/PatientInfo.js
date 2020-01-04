const mongoose = require('mongoose'); 
const PatientInfoSchema = require('./schemas/PatientInfoSchema');

module.exports = PatientInfo = mongoose.model('patientInfo', PatientInfoSchema); 