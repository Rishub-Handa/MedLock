const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const Dispenser = require('../../../models/Dispenser');

const router = express.Router();

console.log('Reached Patient Endpoint');

// @route   GET api/patient/patient 
// @desc    Get patient info associated with id.
// @access  Private, requires Auth0 Access Token 
router.get('/', (req, res) => {
    // Allows patients to get their own information from the Access Token 
    var id = req.user.sub.substring(6);
    console.log("GET Request");
    Patient.findById(id)
        .then(patient => {
            if(patient) {
                res.json(patient); 
            } else {
                res.status(404).send("Not Found"); 
            }
        })
        .catch(error => res.status(404).json(error));
});


router.post('/modules', (req, res) => {
    console.log("ProfileModule POST Request");
    Patient.updateOne(
        { "_id": req.user.sub.substring(6) },
        { "$push":
            { "modules":
                {
                    "name": req.body.name,
                    "content": req.body.content
                }    
            }
        }
    )
        .then(profileModule => res.json(profileModule))
        .catch(err => res.json(err));
});

router.get('/modules', (req, res) => {
    console.log("ProfileModule GET Request");
    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => res.json(patient.modules))
        .catch(err => console.log(err));
});

// @route   PUT api/patient/patient
// @desc    update existing patient
// @access  Private, requires Auth0 Access Token 
router.put('/', (req, res) => {
    console.log(req.body);
    var patientId = req.user.sub.substring(6);
    Patient.findById(patientId, (err, patient) => {
        if (err) return res.status(500).send(err); 

        // update personalData
        for(var property in req.body.medicalData) {
            if (property == "provider") {
                var provider = req.body.medicalData.provider;
                patient.medicalData.providers.push(provider);
            } else {
                patient.medicalData[property] = req.body.medicalData[property];
            }
        } 

        for(var property in req.body.personalData) {
            patient.personalData[property] = req.body.personalData[property];
        }

        console.log("presaved...");
        console.log(patient);

        return patient.save()
            .then(patient => {
                console.log("Patient Updated.");
                console.log(patient);
                res.send(patient);
            });
    });
    // Patient.findByIdAndUpdate(
    //     patientId,
    //     {personalData: req.body},
    //     {new: true},
    //     (err, patient) => {
    //         if (err) return res.status(500).send(err);
    //         console.log(patient);
    //         return res.send(patient);
    //     });
});

router.post('/code', (req, res) => {
    console.log("Dispenser Code POST Request");

    console.log(req.body);

    // Use different logic to identify patient if the provider is registering the patient dispenser 

    var patientId = req.user.sub.substring(6);
    Patient.findById(patientId, (err, patient) => {
        if (err) return res.status(500).send(err); 

        patient.medicalData.dispenserCode = req.body; 

        return patient.save()
            .then(patient => {
                console.log("Patient Updated.");
                console.log(patient.medicalData.dispenserCode);
                res.send(patient.medicalData.dispenserCode);
            })
    }); 

});

module.exports = router;