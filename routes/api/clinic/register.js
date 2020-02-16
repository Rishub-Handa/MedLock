const express = require('express'); 
const mongoose = require('mongoose'); 
const router = express.Router();

const Clinic = require('../../../models/Clinic');

console.log('Reached api/clinic/register endpoint');

router.post('/', (req, res) => {
    console.log('POST request to api/clinic/register');
    const newClinic = new Clinic({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    newClinic.save()
        .then(clinic => {
            console.log(`Clinic(id=${clinic._id}) -> MedLock Database`);
            res.json(clinic);
        }); 
});