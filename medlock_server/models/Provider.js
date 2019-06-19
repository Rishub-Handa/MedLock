const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const PatientInfoSchema = new Schema({
    patientId: {
        type: String, 
        required: true 
    }, 
    // Risk scores and other metrics to evaluate the patient. 
    medicalData: {
        type: Object 
    }
}); 

const ProviderSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    bio: {
        type: String, 
        required: true 
    }, 
    patientList: {
        type: [PatientInfoSchema] 
    } 

}); 

const Provider = mongoose.model('provider', ProviderSchema); 
const PatientInfo = mongoose.model('patientInfo', PatientInfoSchema); 

module.exports = { Provider, PatientInfo }; 