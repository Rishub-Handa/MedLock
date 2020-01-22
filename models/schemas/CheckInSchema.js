const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const CheckInSchema = new Schema({
    data: {
        type: Array 
    }, 
    date: {
        type: Date, 
        default: Date.now 
    }
}); 

module.exports = CheckInSchema;