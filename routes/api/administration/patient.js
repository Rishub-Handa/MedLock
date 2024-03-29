const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Patient = require('../../../models/Patient'); 
const Dispenser = require('../../../models/Dispenser');
const Provider = require('../../../models/Provider');
const axios = require('axios');

const servers = require('../../../config/servers');
const { MEDLOCK_AUTH0 } = servers;

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
    key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
}); 

const router = express.Router(); 

//const functions = require('../functions/endpointFunctions.js')

// @route   GET api/admin/patient
// @desc    fetches all patients
// @access  Public --> Will Change
router.get('/', (req, res) => {
    console.log("Patient GET Request");

    Patient.find({}, (err, patients) => {
        if (err) console.log(err);
        res.json(patients);
    });

});

// @route   DELETE api/admin/patient
// @desc    deletes all patients or individual patient
// @access Public --> Will Change
router.delete('/', (req, res) => {
    console.log("Patient DELETE Request");

    const ids = req.body.ids;
    const AMT = req.body.AMT;

    var deletedPatients = [];
    ids.forEach(id => {
        deletedPatients.push(deletePatient(id, AMT));
        console.log(`deleted patient(id=${id})`);
    });
    
    res.json(deletedPatients);
});

const deletePatient = (id, AMT) => {
    var deletedPatient = deletePatientMongo(id);
    deletePatientChatKit(id);
    deleteUserFromAuth0(id, AMT);
    return deletedPatient;
}

const deletePatientMongo = (patientId) => {
    console.log(`deleting user(id=${patientId}) from MedLock db`);
    var patient;
    Patient.findByIdAndDelete(patientId, (err, deletedPatient) => {
        if (err) console.log(`MedLock: ${err}`);
        patient = deletedPatient;

        // Deletes Dispenser From MongoDB Database
        Dispenser.findByIdAndDelete(deletedPatient.medicalData.dispenser_id, (err, dispenser) => {
            if (err) console.log(`Dispenser: ${err}`);
            else console.log(`dispenser(id=${deletedPatient.medicalData.dispenser_id}) of patient(id=${patientId}) deleted`);
        });
        
        // removes deleted patient from patient list of associated providers
        deletedPatient.medicalData.providers.forEach(providerId => {
            Provider.findOne({ _id: providerId }, (err, provider) => {
                if (err) console.log(err);
                const newPatientList = provider.medicalData.patients.filter(patient => patient._id != patientId); // use != bc different types
                provider.medicalData.patients = newPatientList;
                provider.save()
                    .then(() => console.log(`provider(id=${providerId}) removed patient(id=${patientId}) from their list of patients`));
                });
        });
    });
    return patient;
}

// const deleteAllPatientsMongo = () => {
//     Patient.deleteMany({}, err => console.log(err));
//     //Work on later (maybe) -> delete all patients from providers' patients lists
//     Dispenser.deleteMany({}, err => console.log(err));
// }

const deletePatientChatKit = (id) => {
    console.log(`deleting user(id=${id}) from ChatKit`);
    chatkit.deleteUser({ id: id,})
            .then((user) => console.log(`user(id=${id}) deleted from ChatKit`))
            .catch(err => console.log(`ChatKit: ${err}`));
}

const deleteUserFromAuth0 = (patientId, AMT) => {
    patientId = "auth0|" + patientId;
    console.log(`deleting user(id=${patientId}) from Auth0`);
    var url = `${MEDLOCK_AUTH0}/v2/users/${patientId}`;
    const headers = { authorization: `Bearer ${AMT}`};
    axios.delete(url, { headers })
        .then(() => console.log(`patient(id=${patientId}) deleted from Auth0`))
        .catch(err => console.log(`Auth0: ${err}`));
}

module.exports = router; 