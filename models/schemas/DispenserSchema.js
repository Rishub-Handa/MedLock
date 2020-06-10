const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Dispenser Schema
const DispenserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    pharmacy: {
        name: {
            type: String
        },
        address: {
            type: String
        }
    },
    dateManufactured: {
        type: Date
    },
    datePrescribed: {
        type: Date
    },
    schedule: {
        type: Object
    },
    events: {
        dispenses: [{
            type: Date 
        }], 
        btn1: [{
            type: Date
        }], 
        btn2: [{
            type: Date
        }], 
        btn3: [{
            type: Date 
        }], 
        collarOff: [{
            type: Date 
        }], 
        capTurn: [{
            type: Date 
        }] 
    }, 
    lastUpdated: [{
        type: Date 
    }], 
    info: {
        // button meanings stored as array of strings where array[0] holds the meaning for buton1,
        // array[1] holds the meaning for button 2, and array[2] holds the meaning for button 3
        buttonMeaning: [{ 
            type: String
        }],
    },
});

module.exports = DispenserSchema;