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

// @route   DELETE api/admin/patient
// @desc    deletes all patients or individual patient
// @access Public --> Will Change

const deletePatientMongo = (patientId) => {
    console.log(`deleting user(id=${patientId}) from MedLock db`);
    Patient.findByIdAndDelete(patientId, (err, deletedPatient) => {
        if (err) console.log(`MedLock: ${err}`);

        // Deletes Dispenser From MongoDB Database
        Dispenser.findByIdAndDelete(deletedPatient.medicalData.dispenser_id, (err, dispenser) => {
            if (err) console.log(`Dispenser: ${err}`);
            else console.log(`dispenser(id=${deletedPatient.medicalData.dispenser_id}) of patient(id=${patientId}) deleted`);
        });
        
        // removes deleted patient from patient list of associated providers
        deletedPatient.medicalData.providers.forEach(providerId => {
            Provider.findOne({ _id: providerId }, (err, provider) => {
                if (err) console.log(`Error: ${err}`);
                const newPatientList = provider.medicalData.patients.filter(patient => patient._id != patientId); // use != bc different types
                provider.medicalData.patients = newPatientList;
                provider.save()
                    .then(() => console.log(`provider(id=${providerId}) removed patient(id=${patientId}) from their list of patients`));
                });
        });
    });
}

const deleteAllPatientsMongo = () => {
    Patient.deleteMany({}, err => console.log(err));
    //Work on later (maybe) -> delete all patients from providers' patients lists
    Dispenser.deleteMany({}, err => console.log(err));
}

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

router.delete('/', (req, res) => {
    console.log("Patient DELETE Request");

    const patientId = req.query._id;
    const AMT = req.body.AMT;
    console.log(patientId);

    if (patientId) { // TODO look for deleteAll param too!
        console.log("deleting patient!");
        deletePatientMongo(patientId);
        deletePatientChatKit(patientId);
        deleteUserFromAuth0(patientId, AMT);
    } else if (req.query.deleteAll) {
        deleteAllPatientsMongo();
    } else {
        throw new Error("no delete function specified");
    }
});

module.exports = router; 