const mongoose = require('mongoose');
const ClinicSchema = require('./schemas/ClinicSchema');

module.exports = Clinic = mongoose.model('clinic', ClinicSchema);