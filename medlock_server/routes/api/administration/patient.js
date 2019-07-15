const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Patient = require('../../../models/Patient'); 
const Dispenser = require('../../../models/Dispenser');
import auth0client from '../auth/Auth';
import axios from 'axios';
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
    key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
}); 

const router = express.Router(); 

// @route   DELETE api/admin/patient
// @desc    deletes all patients or individual patient
// @access Public --> Will Change
router.delete('/', (req, res) => {
    console.log("Patient DELETE Request");

    // delete chatkit account
    // delete auth0 account
    // delete medlock account
    const {getAccessToken} = auth0client;
    let API_URL = `http://localhost:5000/api/provider/patients?${req.body._id}`;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`};

    if(req.body._id) {
        chatkit.deleteUser({id: req.body._id,})
            .then(curUser => {console.log("User Deleted Successfully From Chatkit")})
            .catch(err => {console.log("Failed To Find/Delete User From Chatkit")});
        axios.delete(API_URL);
        Patient.find({_id: req.body._id}).remove().exec();
        Dispenser.find({_id: req.body.medicalData.dispenser_id}).remove().exec();
    }
    else if(!req.body.deleteAll){
        Patient.deleteMany({}, err => console.log(err));
        Dispenser.deleteMany({}, err => console.log(err));
    }
    else {
        console.log("Error: No delete function specified");
    }
});

module.exports = router; 