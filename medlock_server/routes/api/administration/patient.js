const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Patient = require('../../../models/Patient'); 
const Dispenser = require('../../../models/Dispenser');
const qs = require('query-string');
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
    const _id = req.query._id;
    console.log(req.query);
    if(req.query._id) {
        chatkit.deleteUser({id: _id,})
            .then(curUser => {console.log(`User ${_id} Deleted Successfully From Chatkit`)})
            .catch(err => {console.log("Failed To Find/Delete User From Chatkit")});
        //Dispenser.find({_id: Patient.find(req.query._id)}).remove().exec();
        Patient.findOne({_id : _id}, 
            (err, result) => {
                
                if(err) {console.log(`Error: ${err}`)}
                
                Dispenser.findByIdAndDelete({dispenser_id : result.medicalData.dispenser_id})
                    .then(() => console.log("DELETED DISPENSER FROM DATABASE"))
                    .catch((err) => console.log(`Error Code: ${err}`));

                Patient.findByIdAndDelete({_id : _id})
                    .then(() => console.log("DELETED PATIENT FROM DATABASE"))
                    .catch((err) => console.log(`Error Code: ${err}`));
            }
        )
    }
    else if(req.query.deleteAll == true){
        Patient.deleteMany({}, err => console.log(err));
        Dispenser.deleteMany({}, err => console.log(err));
    }
    else {
        console.log("Error: No delete function specified");
    }
});

module.exports = router; 