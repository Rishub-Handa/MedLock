const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const DispenseSchema = new Schema({
    //id of dispenser
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    dispenses: [
        {
            date: String, 
            time: String 
        }
    ]
})

module.exports = Dispense = mongoose.model('dispense', DispenseSchema); 