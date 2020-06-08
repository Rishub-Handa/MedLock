const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const Provider = require('../../../models/Provider');
const Dispenser = require('../../../models/Dispenser');
const CheckIn = require('../../../models/CheckIn'); 
const user = require("./user");
const auth = require("../auth");
const roles = require('../roles');

const router = express.Router();

console.log('Reached Patient Endpoint');

// @route   POST api/user/delete 
// @desc    Delete user associated with id.
// @access  Limited to Admin.  
router.post('/', (req, res) => {
    // req.body should contain user id
    var id = req.body.id;
    
    // fetch roles to know how to proceed
    auth.fetchRoles(id)
        .then(r => {
            const role_list = r.data;
            var role = role_list[0].name.toLowerCase();
            
            // delete from MedLock database
            var user = deleteUserFromMedLockDb(id, role);
            
            // delete from Auth0
            auth.deleteUser(id)
                .then(() => console.log(`User(id=${id}) delete from Auth0.`))
                .catch(() => console.log(`Error occured while deleting User(id=${id}) from Auth0.`));

            // send deleted user back to client
            res.json([user]);
        });

});

const deleteUserFromMedLockDb = (id, role) => {
    switch (role) {
        case roles.PATIENT:
            return deletePatientFromMedLockDb(id);
        case roles.PROVIDER:
            return deleteProviderFromMedLockDb(id);
        default:
            throw new Error(`${role} is an invalid role.`);
    }
};

const deletePatientFromMedLockDb = (id) => {
    console.log(`Deleting Patient(id=${id}) from MedLock database.`);
    var user;
    Patient.findByIdAndDelete(id, (err, patient) => {
        user = patient;
        if (err) {
            console.log(`Error(${err}) encountered while deleting Patient(id=${id}) from MedLock database.`);
        } 

        Dispenser.findByIdAndDelete(patient.medicalData.dispenser_id, (err, dispenser) => {
            if (err) {
                console.log(`Error(${err}) encountered while deleting Dispenser(id=${patient.medicalData.dispenser_id}) of Patient(id=${id}) from MedLock database.`);
            } else {
                console.log(`Dispenser(id=${patient.medicalData.dispenser_id}) of Patient(id=${id}) deleted successfully from MedLock database.`);
            }
        });

        // removes deleted patient from patient list of associated providers
        patient.medicalData.providers.forEach(providerId => {
            Provider.findOne({ _id: providerId }, (err, provider) => {
                if (err) {
                    console.log(`Error(${err}) encountered while removing Patient(id=${id}) from Provider's(id=${patient._id})'s list of Patients.`);
                }
                const newPatientList = provider.medicalData.patients.filter(patient => patient._id != _id); // use != bc different types
                provider.medicalData.patients = newPatientList;
                provider.save()
                    .then(() => console.log(`Patient(id=${patient._id} and Provider(id=${id}) unlinked.`));
                });
        });
    });
    return user;
};

const deleteProviderFromMedLockDb = (id) => {
    console.log(`Deleting Provider(id=${id}) from MedLock database.`);
    var user;
    Provider.findByIdAndDelete(id, (err, provider) => {
        user = provider;
        if (err) {
            console.log(`Error(${err}) encountered while deleting Provider(id=${id}) from MedLock database.`);
        }   
        // remove provider id from each patients' list of providers      
        provider.medicalData.patients.forEach(patient => {
            Patient.findOne({ _id: patient._id }, (err, patient) => {
                if (err) {
                    console.log(`Error(${err}) encountered while removing Provider(id=${id}) from Patient(id=${patient._id})'s list of Providers.`);
                }
                const newProviderList = patient.medicalData.providers.filter(id => id != id);
                patient.medicalData.providers = newProviderList;
                patient.save()
                    .then(() => console.log(`Patient(id=${patient._id} and Provider(id=${id}) unlinked.`));
            });
        });
    });
    return user;
};



module.exports = router;