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
            
            // delete from Auth0
            auth.deleteUser(id)
                .then(() => console.log(`User(id=${id}) delete from Auth0.`))
                .catch(() => console.log(`Error occured while deleting User(id=${id}) from Auth0.`));

            // delete from MedLock database
            const promise = deleteUserFromMedLockDb(id, role);
            console.log(promise);
            promise.then(user => {
                console.log(user);
                res.json([user]);
            });
            // send deleted user back to client
            // res.json([user]);
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
    const promise = new Promise((resolve, reject) => {
        Patient.findByIdAndDelete(id, (err, patient) => {
            if (err) {
                console.log(`Error(${err}) encountered while deleting Patient(id=${id}) from MedLock database.`);
                reject(err);
            } 
    
            Dispenser.findByIdAndDelete(patient.medicalData.dispenser_id, (err, dispenser) => {
                if (err) {
                    console.log(`Error(${err}) encountered while deleting Dispenser(id=${patient.medicalData.dispenser_id}) of Patient(id=${id}) from MedLock database.`);
                } else {
                    console.log(`Dispenser(id=${patient.medicalData.dispenser_id}) of Patient(id=${id}) deleted successfully from MedLock database.`);
                }
            });

            if (patient.medicalData.providers.length == 0) {
                resolve(patient);
            } else {
                // removes deleted patient from patient list of associated providers
                var count = 0;
                patient.medicalData.providers.forEach(providerId => {
                    console.log(count);
                    Provider.findOne({ _id: providerId }, (err, provider) => {
                        if (err) {
                            console.log(`Error(${err}) encountered while removing Patient(id=${id}) from Provider's(id=${patient._id})'s list of Patients.`);
                            reject(err);
                        }
                        const newPatientList = provider.medicalData.patients.filter(patient => patient._id != id); // use != bc different types
                        console.log(newPatientList);
                        provider.medicalData.patients = newPatientList;
                        provider.save()
                            .then(() => {
                                console.log(`Patient(id=${patient._id} and Provider(id=${id}) unlinked.`);
                                count = count + 1;
                                console.log(count);
                                if (count >= patient.medicalData.providers.length) {
                                    console.log("resolved");
                                    resolve(patient);
                                }
                            });                
                        }); 
                });
            }
        });
    });
    return promise;
};

const deleteProviderFromMedLockDb = (id) => {
    console.log(`Deleting Provider(id=${id}) from MedLock database.`);
    const promise = new Promise((resolve, reject) => {
        Provider.findByIdAndDelete(id, (err, provider) => {
            if (err) {
                console.log(`Error(${err}) encountered while deleting Provider(id=${id}) from MedLock database.`);
                reject(err);
            }   

            if (provider.medicalData.patients.length == 0) {
                resolve(provider);
            } else {
                // remove provider id from each patients' list of providers 
                var count = 0;     
                provider.medicalData.patients.forEach(patient => {
                    console.log(patient);
                    Patient.findOne({ _id: patient._id }, (err, patient) => {
                        console.log(patient);
                        if (err) {
                            console.log(`Error(${err}) encountered while removing Provider(id=${id}) from Patient(id=${patient._id})'s list of Providers.`);
                        }
                        const newProviderList = patient.medicalData.providers.filter(id => id != id);
                        patient.medicalData.providers = newProviderList;
                        patient.save()
                            .then(() => {
                                console.log(`Patient(id=${patient._id} and Provider(id=${id}) unlinked.`);
                                count = count + 1;
                                if (count >= provider.medicalData.patients.length) {
                                    resolve(provider);
                                }                    
                            });
                    });
                });
            }
        });
    });
    return promise;
};



module.exports = router;