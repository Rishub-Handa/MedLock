const express = require('express');
const Patient = require('../../models/Patient');
const mongoose = require('mongoose');

const router = express.Router();

console.log('Reached Patient Endpoint');

// @route GET api/patient
// @desc Get patient info associated with id.
// @access public --> Will Change
router.get('/', (req, res) => {
    var id = req.user.sub.substring(6);
    console.log("GET Request");
    Patient.findById(id)
        .then(patient => {
            console.log(patient);
            res.json(patient);
        })
        .catch(error => res.status(404).json(error));
});

// @route POST api/patient
// @desc create new patient
// @access Public --> Will Change
router.post('/', (req, res) => {
    console.log('POST Request');
    console.log(req.body);

    const newPatient = new Patient({
        _id: mongoose.Types.ObjectId(req.body._id),
        name: req.body.name,
        bio: req.body.bio,
        dispenser_id: mongoose.Types.ObjectId(),
        modules: []

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

// @route PUT api/patient
// @desc update existing patient
// @access Public --> Will Change
router.put('/', (req, res) => {
    console.log('PUT Request');
    var patientId = req.user.sub.substring(6);
    console.log(req.body);
    Patient.findByIdAndUpdate(
        patientId,
        {name: req.body.newName, bio: req.body.newBio},
        {new: true, useFindAndModify: false},
        (err, patient) => {
            if (err) return res.status(500).send(err);
            console.log(patient);
            return res.send(patient);
        });
});

module.exports = router;