const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create ProviderInfo Schema
// The information about providers stored by patients and other providers. 
const ProviderInfoSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        required: true 
    }, 
    role: {
        type: String
    }
}); 

module.exports = ProviderInfoSchema;