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

module.exports = router;