const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Patient = require('../../../models/Patient'); 
const Dispenser = require('../../../models/Dispenser');
const Provider = require('../../../models/Provider')
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

    // delete auth0 account
    const _id = req.query._id;

    if(req.query._id) {
        chatkit.deleteUser({id: _id,})
            .then(curUser => {console.log(`User ${_id} Deleted Successfully From Chatkit`)})
            .catch(err => {console.log("Failed To Find/Delete User From Chatkit")});
        
        Patient.findOne({_id : _id}, 
            (err, result) => {

                if(err) {console.log(`Error: ${err}`)}
                
                if(result.medicalData.dispenser_id) {
                    Dispenser.findByIdAndDelete({dispenser_id : result.medicalData.dispenser_id})
                        .then(() => console.log("DELETED DISPENSER FROM DATABASE"))
                        .catch((err) => console.log(`Error Code: ${err}`));
                }  
                for(var i = 0; i < result.medicalData.providers.length; i++)
                {
                    console.log("REACHED INSIDE OF FOR LOOP");
                    Provider.findOne({_id: result.medicalData.providers[i]}, 
                        (err, result) => {

                            console.log("FOUND PROVIDER:" + result.personalData.name);

                            if(err) {console.log(`Error: ${err}`)}

                            var newPatients = result.medicalData.patients.filter((value) => {
                                return value._id != _id;
                            })

                            result.medicalData.patients = newPatients;
                            console.log("RESULT PATIENTS:" + result.medicalData.patients);
                            console.log(`FILTERED PATIENTS: ${newPatients}`);
                            result.save()
                                .then()
                                .catch((err) => console.log(err));

                            // Provider.findByIdAndUpdate(result._id, {$set: {'meta.medicalData.patients': newPatients}}, (err, doc) => {
                            //     console.log(err);
                            //     console.log(doc);
                            // }).then().catch((err) => console.log(err));

                        }).then(() => {

                            Patient.findByIdAndDelete({_id : _id})
                            .then(() => console.log("DELETED PATIENT FROM DATABASE"))
                            .catch((err) => console.log(`Error Code: ${err}`));

                        }).catch((err) => {console.log(err)});
                }
            }).then().catch((err) => {console.log(err)});
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