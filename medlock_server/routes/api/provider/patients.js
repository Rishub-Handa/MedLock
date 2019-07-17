const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Provider = require('../../../models/Provider'); 
const Patient = require('../../../models/Patient'); 

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
    key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
});

//const functions = require('../functions/endpointFunctions.js');
const router = express.Router(); 

const addPatientCreateChat = (req, res, providerId, patientId) => {

    // Add patient to Provider patient list. 
    Provider.findById(providerId, (err, provider) => {
        console.log("Reached");
        console.log(req.body); 
        if (err) return res.status(500).send(err);
        const newPatient = {
            _id: patientId, 
            name: req.body.personalData.name, 
            email: req.body.personalData.email 
        };
        console.log(newPatient);

        // Check if newPatient exists in array. 
        console.log(`Provider Patient List: ${provider.medicalData.patients}`); 
        let contains = false; 

        provider.medicalData.patients.forEach(patient => {
            console.log(patient._id); 
            if("" + patient._id === "" + patientId)  
                contains = true; 
        })

        console.log(contains); 
        if(!contains) {

            // If the provider has not already registered with the patient, create a chat. 

            // TODO: Create field to transmit patient name. 
            // Have all joinable rooms display 
            // Have providers search for joinable rooms 

            chatkit.createRoom({
                creatorId: providerId,
                name: `${req.body.personalData.name} + ${provider.personalData.name}`,
                isPrivate: true, 
                userIds: [patientId] 
            })
                .then(() => {
                  console.log('Room created successfully');
                }).catch((err) => {
                  console.log(err);
                });


            provider.medicalData.patients.push(newPatient);
            provider.save()
                .then(provider => {
                    console.log(`Patient with id=${newPatient._id} added to patient list of Provder with id=${providerId}.`);
                })
                .catch(error => console.log(error));
        }
    });
}

// @route   GET api/provider/allPatients 
// @desc    Get all patients information associated with provider.
// @access  Private, requires Auth0 Access Token 
router.get('/', (req, res) => {

    console.log("/api/provider/patients Endpoint Reached. "); 
    
    const id = req.user.sub.substring(6); 
    console.log(id); 

    Provider.findById(id) 
        .then(provider => {
            console.log(provider);

            const patients = provider.medicalData.patients; 
            const patientIds = patients.map(patient => mongoose.Types.ObjectId(patient._id)); 
            Patient.find({
                "_id": {
                    "$in": patientIds 
                }
            }) 
                .then(patientInfo => res.json(patientInfo)) 
                .catch(error => console.log(error)); 
        })
        .catch(error => console.log(error)); 

}); 

// @route   POST api/provider/patients 
// @desc    Add a patient to the provider's list of patients 
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {

    const providerId = req.user.sub.substring(6);
    const patientId = req.body._id; 
    console.log(patientId); 

    Patient.find({ "_id": mongoose.Types.ObjectId(patientId) })
    .then(patients => {
        if (patients.length > 1) throw new Error("Multiple patients with same id exist!");
        
        // patient does not exist in our database
        else if (patients.length === 0) {
            // create new patient
            const newPatient = new Patient({
                _id: mongoose.Types.ObjectId(patientId),
                personalData: req.body.personalData,
                medicalData: {
                    ...req.body.medicalData,
                    dispenser_id: mongoose.Types.ObjectId()
                },
            });
            newPatient.medicalData.providers.push(providerId);
            newPatient.save().then(patient => console.log("Patient -> MedLock Database"));
        }

        const newPatientInfo = {
            _id: patientId,
            name: req.body.personalData.name,
            email: req.body.personalData.email
        };

        addPatientToProviderList(providerId, newPatientInfo);
    });

});

const addPatientToProviderList = (providerId, newPatientInfo) => {
    const patientId = newPatientInfo._id;
    Provider.findById(providerId, (err, provider) => {
        if (err) return res.status(500).send(err);
        const duplicatePatients = provider.medicalData.patients.filter(patient => patientId === patient._id);
        if (duplicatePatients.length === 0) throw new Error(`Provider with id=${providerId} already has a patient with id=${patientId}`);
        else {
            // add patient to provider list
            provider.medicalData.patients.push(newPatientInfo);
            provider.save()
                .then(provider => console.log(`Patient with id=${patientId} added to patient list of Provder with id=${providerId}.`))
                .catch(error => console.log(error));
        }
    });
}

// @route   DELETE api/provider/patients 
// @desc    Delete a patient from provider patientList 
// @access  Private, requires Auth0 Access Token  
router.delete('/:id', (req, res) => { 
    console.log("Patient DELETE Request -- remove patient from provider's list of patients");

    const providerId = req.body.sub.substring(6);
    const patientId = req.query._id;

    //initializes data for patient that is deleted
<<<<<<< HEAD
    var deletePatient = 0;
    if(id) {        

    }
=======
    var removedPatient;

    Provider.findById(providerId)
        .then(provider => {
            const newPatientList = provider.medicalData.patients.filter(patient => patient._id !== patientId);
            provider.medicalData.patients = newPatientList;
            provider.save()
                .then(() => console.log(`provider(id=${providerId}) removed patient(id=${patientId}) from their list of patients`));
        });
    
    Patient.findById(patientId)
        .then(patient => {
            const newProviderList = patient.medicalData.providers.filter(provider => provider._id === providerId);
            patient.medicalData.providers = newProviderList;
            patient.save()
                .then(() => console.log(`provider(id=${providerId}) has been removed from list of providers of patient(id=${patientId})`));
        });
>>>>>>> master
    
}); 

// @route   PUT api/provider/allPatients 
// @desc    Change the patient data for provider patientList 
// @access  Private, requires Auth0 Access Token  
router.put('/:id', (req, res) => { 

    // Might fix later 
    const id = req.user.sub.substring(6); 
    Provider.update({
        "_id": id, 
        "patientList.patient_id": req.params.id 
        }, 
        {
            "$set": { "patientList.$.medicalData": req.body.medicalData }
        }) 
    
}); 

module.exports = router; 

