const express = require('express');
const mongoose = require('mongoose');
const Clinic = require('../../../models/Clinic');

const router = express.Router();
console.log('Reached /api/clinic/clinic endpoint');

router.get('/', (req, res) => {
    // get all clinics
    const clinics = [
        {
            _id: "12345",
            name: "Ashburn MAT",
        },
        {
            _id: "54321",
            name: "Charlottesville MAT"
        }
    ];
    res.json(clinics);

});

module.exports = router;