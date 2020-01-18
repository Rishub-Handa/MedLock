const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const PatientInfoSchema = require('./schemas/PatientInfoSchema');
const ProviderInfoSchema = require('./schemas/ProviderInfoSchema');

const ProviderSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    personalData: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        phone: {
            type: String
        },
        chatname: {
            type: String,
            default: this.name
        },
        practiceData: {
            name: {
                type: String
            },
            address: {
                type: String
            },
            phone: {
                type: String
            },
            rating: {
                type: Number
            }
        }
    },
    medicalData: {
        clinic: {
            type: Schema.Types.ObjectId,
        },
        patients: [PatientInfoSchema],
        providers: [ProviderInfoSchema]
    }
}); 

module.exports = Provider = mongoose.model('provider', ProviderSchema);