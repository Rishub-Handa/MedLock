const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    providers: [{ 
        type: Schema.Types.ObjectId,
    }],
    patients: [{
        type: Schema.Types.ObjectId,
    }]
});

module.exports = ClinicSchema;