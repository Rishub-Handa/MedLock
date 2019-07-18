const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Patient = require('../../../models/Patient'); 
const Dispenser = require('../../../models/Dispenser');
const Provider = require('../../../models/Provider');

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
    Patient.findByIdAndDelete(patientId, (err, deletedPatient) => {
        if (err) console.log(`Error: ${err}`);

        // Deletes Dispenser From MongoDB Database
        if(deletedPatient.medicalData.dispenser_id) {
            Dispenser.findByIdAndDelete({dispenser_id : deletedPatient.medicalData.dispenser_id})
                .then(() => console.log("DELETED DISPENSER FROM DATABASE"))
                .catch((err) => console.log(`Error: ${err}`));
        }
        
        // removes deleted patient from patient list of associated providers
        deletedPatient.medicalData.providers.forEach(providerId => {
            Provider.findOne({ _id: providerId }, (err, provider) => {
                if (err) console.log(`Error: ${err}`);
                const newPatientList = provider.medicalData.patients.filter(patient => patient._id !== patientId);
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
    chatkit.deleteUser({ id: id,})
            .then(curUser => console.log(`User(id=${id}) Deleted Successfully From Chatkit`))
            .catch(err => console.log(`Error: ${err}`));
}

router.delete('/', (req, res) => {
    console.log("Patient DELETE Request");
    console.log(req.body);
    console.log("___________");
    console.log(req.config);

    const patientId = req.query._id;
    const AMT = req.body.AMT;

    if (patientId && !req.query.deleteAll) {
        deletePatientChatKit(patientId);
        deletePatientMongo(patientId);
        deleteUserFromAuth0(patientId, AMT);
    } else if (req.query.deleteAll) {
        deleteAllPatientsMongo();
    } else {
        throw new Error("no delete function specified");
    }
});

const deleteUserFromAuth0 = (patientId, AMT) => {
    var url = `${MEDLOCK_AUTH0}/v2/users/${id}`;
    const headers = { authorization: `Bearer ${AMT}`};
    axios.delete(url, headers)
        .then(console.log(`patient(id=${patientId}) deleted from Auth0`))
        .catch(err => console.log(`Error: ${err}`));
}

module.exports = router; 