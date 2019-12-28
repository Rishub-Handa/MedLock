const mongoose = require('mongoose'); 
const DispenserSchema = require('./schemas/DispenserSchema');

module.exports = Dispenser = mongoose.model('dispenser', DispenserSchema); 