const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Provider = require('../../../models/Provider'); 
const Patient = require('../../../models/Patient'); 
const PatientInfoSchema = require('../../../models/schemas/PatientInfoSchema'); 

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
    key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
});
const router = express.Router(); 

const createChatKitRoom = (providerId, patientName, providerName, patientId) => {
    chatkit.createRoom({
        creatorId: providerId,
        name: `${patientName} + ${providerName}`,
        isPrivate: true, 
        userIds: [patientId] 
    })
        .then(() => {
          console.log('Room created successfully');
        }).catch((err) => {
          console.log(err);
        });
}

const createChatKitUser = (req, res, providerId, patientId) => {
    chatkit.createUser({
        id: patientId, 
        name: req.body.personalData.name 
    }) 
        .then(() => {
            console.log("User was created. "); 
            // Create Provider Patient Communication Chat. 
            addPatientCreateChat(req, res, providerId, patientId); 
        }) 
        .catch(error => console.log(error)); 
}

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
        //console.log(`Provider Patient List: ${provider.medicalData.patients}`); 
        let contains = false; 

        provider.medicalData.patients.forEach(patient => {
            //console.log(patient._id); 
            if("" + patient._id === "" + patientId)  
                contains = true; 
        })

        //console.log(contains); 
        if(!contains) {

            // If the provider has not already registered with the patient, create a chat. 

            // TODO: Create field to transmit patient name. 
            // Have all joinable rooms display 
            // Have providers search for joinable rooms 

            // chatkit.createRoom({
            //     creatorId: providerId,
            //     name: `${req.body.personalData.name} + ${provider.personalData.name}`,
            //     isPrivate: true, 
            //     userIds: [patientId] 
            // })
            //     .then(() => {
            //       console.log('Room created successfully');
            //     }).catch((err) => {
            //       console.log(err);
            //     });

            createChatKitRoom(providerId, req.body.personalData.name, provider.personalData.name, patientId);

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
// @desc    Add a patient to the provider patientList 
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {

    const providerId = req.user.sub.substring(6);
    const patientId = req.body._id; 
    console.log(patientId); 

    // Check if patient exists 

    Patient.find({
        "_id": mongoose.Types.ObjectId(patientId) 
    }).limit(1)  
        .then(res => { 
            // Create patient in database if does not exist. 
            if(res.length === 0) {
                console.log("Creating New Patient . . . "); 
                const newPatient = new Patient({
                    _id: mongoose.Types.ObjectId(req.body._id),
                    personalData: req.body.personalData,
                    medicalData: {
                        ...req.body.medicalData,
                        dispenser_id: mongoose.Types.ObjectId(),
                    },
                }); 

                // Create new user in ChatKit when creating new user in MongoDB 
                // Create name field in patient registration 
                // chatkit.createUser({
                //     id: patientId, 
                //     name: req.body.personalData.name 
                // }) 
                //     .then(() => {
                //         console.log("User was created. "); 
                //         // Create Provider Patient Communication Chat. 
                //         addPatientCreateChat(req, res, providerId, patientId); 
                //     }) 
                //     .catch(error => console.log(error)); 
                createChatKitUser(req, res, providerId, patientId);

                newPatient.save()
                    .then(patient => {
                        console.log("Patient -> Database");
                    });
            } else {
                // The patient exists in the database. Add the providerId to patient providers. 
                Patient.findById(patientId) 
                    .then(patient => {
                        let contains = false; 

                        patient.medicalData.providers.forEach(provider => {
                            if(provider === providerId) {
                                contains = true; 
                            }
                        }); 

                        if(!contains) {
                            console.log("Adding Provider to patient provider list. "); 
                            patient.medicalData.providers.push(providerId); 
                            patient.save() 
                                .then(patient => {
                                    console.log("Provider added to patient provider list. "); 
                                })
                        }

                    }); 

                // Create Provider Patient Communication Channel 
                addPatientCreateChat(req, res, providerId, patientId); 
            }
        }) 
        .catch(error => console.log(error)); 



});

// @route   DELETE api/provider/patient 
// @desc    Delete a patient from provider patientList 
// @access  Private, requires Auth0 Access Token  
router.delete('/:id', (req, res) => { 

    // Might fix later 
    console.log("Patient DELETE Request");

    const _id = req.query._id;
    //initializes data for patient that is deleted
    var deletePatient = 0;
    if(_id) {
        //Deletes User From Chatkit
        deletePatientChatKit(_id);
        
        //Deletes User and Dispenser From MongoDB Database
        deletePatient = deletePatientMongo(_id);

    }
    else {
        console.log("Error: No delete function specified");
    }
    return deletePatient;
    
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

