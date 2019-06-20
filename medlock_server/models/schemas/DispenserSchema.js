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
    dispenses: [
        {
            type: Number,
        }
    ]
});

module.exports = DispenserSchema;