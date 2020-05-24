const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const router = express.Router();

console.log('Reached api/patient/documents endpoint');

// @route   POST api/patient/documents
// @desc    Upload new document to patient profile
// @access  Private, requires an Auth0 Access Token
router.post('/', (req, res) => {
    console.log("POST request to api/patient/documents");
    console.log(req.body);
});

module.exports = router;