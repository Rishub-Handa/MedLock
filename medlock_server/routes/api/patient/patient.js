const express = require('express');
const Patient = require('../../../models/Patient');
const Dispenser = require('../../../models/Dispenser');
const mongoose = require('mongoose');

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

// @route   POST api/patient/patient
// @desc    create new patient
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {
    console.log('POST Request');
    console.log(req.body);



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
            res.json(patient);
        });
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
    console.log('PUT Request');
    var patientId = req.user.sub.substring(6);
    Patient.findById(patientId, (err, patient) => {
        if (err) return res.status(500).send(err);
        for(var property in req.body) {
            patient.personalData[property] = req.body[property]; 
        }
        return patient.save()
            .then(patient => {
                console.log("Patient Updated.");
                console.log(patient.personalData);
                res.send(patient.personalData);
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

module.exports = router;