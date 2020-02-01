const mongoose = require('mongoose'); 
const CheckInSchema = require('./schemas/CheckInSchema');

module.exports = CheckIn = mongoose.model('checkIn', CheckInSchema); 