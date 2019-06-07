const express = require('express');
const Patient = require('../../models/Patient');

const router = express.Router();

console.log('Reached Patient Endpoint');

// @route GET api/patient
// @desc Get all patient info
// @access public --> Will Change
router.get('/', (req, res) => {
    console.log('Get Request');
    Patient.find()
        .sort({ name: -1})
        .then(patient => res.json(patient));
});

// @route POST api/patient
// @desc create new patient
// @access Public --> Will Change
router.post('/', (req, res) => {
    console.log('Post Request');
    const newPatient = new Patient({
        profile: {
            _id: req.body._id,
            name: req.body.name,
            bio: req.body.bio
        }
    });

    newPatient.save()
        .then(patient => {
            console.log("Patient -> Database");
            res.json(patient);
        });
});

module.exports = router;