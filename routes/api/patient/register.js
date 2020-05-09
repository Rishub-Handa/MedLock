const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const Dispenser = require('../../../models/Dispenser');
const router = express.Router();

console.log('Reached api/patient/register endpoint');

// @route   POST api/patient/register
// @desc    Create new patient account
// @access  Public, does not require an Auth0 Access Token
router.post('/', (req, res) => {
    console.log("POST request to api/patient/patient");
    const patientId = req.body._id;
    Patient.find({ "_id": mongoose.Types.ObjectId(patientId) })
        .then(patients => {
            if (patients.length > 1) {
                throw new Error("Multiple patients with same ObjectId exist!");
            } else if (patients.length === 0) {
                // create new patient
                const newPatient = new Patient({
                    _id: mongoose.Types.ObjectId(patientId),
                    personalData: req.body.personalData,
                    medicalData: {
                        dispenser_id: mongoose.Types.ObjectId()
                    },
                });
                newPatient.save().then(patient => console.log(`Patient(id=${req.body._id}) -> MedLock Database`));
            } else if (patients.length === 1) {
                throw new Error(`Patient(id=${req.body._id})already exists in MedLock Database.`);
            }
        });
});

module.exports = router;