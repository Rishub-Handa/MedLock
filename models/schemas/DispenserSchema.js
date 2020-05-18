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
    }]
});

module.exports = DispenserSchema;