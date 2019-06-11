const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const DispenseSchema = new Schema({
    _id: {
        type: Number
    }, 
    dispenses: [
        {
            date: String, 
            time: String 
        }
    ]
})

module.exports = Dispense = mongoose.model('dispense', DispenseSchema); 