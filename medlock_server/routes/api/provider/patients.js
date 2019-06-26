const express = require('express'); 
const Provider = require('../../../models/Provider'); 
const Patient = require('../../../models/Patient'); 
const PatientInfoSchema = require('../../../models/schemas/PatientInfoSchema'); 
const mongoose = require('mongoose'); 

const router = express.Router(); 

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
                .then(res => console.log(res)) 
                .catch(error => console.log(error)); 

            res.json(patientIds); 
        })
        .catch(error => console.log(error)); 

}); 

// @route   POST api/provider/patients 
// @desc    Add a patient to the provider patientList 
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {

    const providerId = req.user.sub.substring(6);
    const patientId = req.body._id; 

    // Check if patient exists 

    Patient.find({
        "_id": mongoose.Types.ObjectId(patientId) 
    }).limit(1)  
        .then(res => {
            console.log("Creating New Patient . . . "); 

            // Create patient in database if does not exist. 
            if(res.length === 0) {
                const newPatient = new Patient({
                    _id: mongoose.Types.ObjectId(req.body._id),
                    personalData: req.body.personalData,
                    medicalData: {
                        ...req.body.medicalData,
                        dispenser_id: mongoose.Types.ObjectId(),
                    },
                });
            
                newPatient.save()
                    .then(patient => {
                        console.log("Patient -> Database");
                    //    res.json(patient);
                    });
            } else {
                // The patient exists in the database. Add the providerId to patient providers. 
                
            }
        }) 
        .catch(error => console.log(error)); 


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
        const contains = false; 

        provider.medicalData.patients.forEach(patient => {
            if(patient._id === patientId) 
                contains = true; 
        })

        console.log(contains); 
        if(!contains) {
            provider.medicalData.patients.push(newPatient);
            provider.save()
                .then(provider => {
                    console.log(`Patient with id=${newPatient._id} added to patient list of Provder with id=${providerId}.`);
                })
                .catch(error => console.log(error));
        }
    });

});

// @route   DELETE api/provider/allPatients 
// @desc    Delete a patient from provider patientList 
// @access  Private, requires Auth0 Access Token  
router.delete('/:id', (req, res) => { 

    // Might fix later 
    const id = req.user.sub.substring(6); 
    Provider.update({
        "_id": id 
        }, 
        {
            "$pull": { "patientList": { "patientId": req.params.id }}
        }) 
    
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
