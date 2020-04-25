const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const Dispenser = require('../../../models/Dispenser');
const CheckIn = require('../../../models/CheckIn'); 

const router = express.Router();

console.log('Reached Patient Endpoint');

// @route   GET api/patient/patient 
// @desc    Get patient info associated with id.
// @access  Private, requires Auth0 Access Token 
router.get('/', (req, res) => {
    // Allows patients to get their own information from the Access Token 
    var id = req.user.sub.substring(6);
    console.log("GET Request");
    Patient.findById(id)
        .then(patient => {
            if(patient) {
                res.json(patient); 
            } else {
                res.status(404).send("Not Found"); 
            }
        })
        .catch(error => res.status(404).json(error));
});


router.post('/modules', (req, res) => {
    console.log("ProfileModule POST Request");
    Patient.updateOne(
        { "_id": req.user.sub.substring(6) },
        { "$push":
            { "modules":
                {
                    "name": req.body.name,
                    "content": req.body.content
                }    
            }
        }
    )
        .then(profileModule => res.json(profileModule))
        .catch(err => res.json(err));
});

router.get('/modules', (req, res) => {
    console.log("ProfileModule GET Request");
    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => res.json(patient.modules))
        .catch(err => console.log(err));
});

// @route   PUT api/patient/patient
// @desc    update existing patient
// @access  Private, requires Auth0 Access Token 
router.put('/', (req, res) => {
    var patientId = req.user.sub.substring(6);
    Patient.findById(patientId, (err, patient) => {
        if (err) return res.status(500).send(err); 

        for(var property in req.body) {
            patient.personalData[property] = req.body[property]; 
        }

        return patient.save()
            .then(patient => {
                console.log("Patient Updated.");
                console.log(patient.personalData);
                res.send(patient);
            });
    });
});

router.post('/code', (req, res) => {
    console.log("Dispenser Code POST Request");

    console.log(req.body.numArray);

    var patientId = ""; 

    if(req.body.patientId) {
        patientId = req.body.patientId; 
    } else {
        req.user.sub.substring(6); 
    }

    Patient.findById(patientId, (err, patient) => {
        if (err || !patient) return res.status(500).send(err); 

        patient.medicalData.dispenserCode = req.body.numArray; 

        return patient.save()
            .then(patient => {
                console.log("Patient Updated.");
                console.log(patient.medicalData.dispenserCode);
                res.send(patient.medicalData.dispenserCode);
            })
    }); 

}); 

router.post('/checkIn', (req, res) => {
    console.log("CheckIn POST Request");
    // Patient.updateOne(
    //     { "_id": req.user.sub.substring(6) },
    //     { "$push":
    //         { "modules":
    //             {
    //                 "name": req.body.name,
    //                 "content": req.body.content
    //             }    
    //         }
    //     }
    // )
    //     .then(profileModule => res.json(profileModule))
    //     .catch(err => res.json(err)); 

    console.log(req.body); 

    var id = req.body.patientId;

    
    Patient.findById(id)
        .then(patient => {
            const newCheckIn = new CheckIn({
                data: req.body.responses, 
            }); 

            patient.medicalData.checkIns.push(newCheckIn); 

            patient.save() 
                .then(patient => {
                    res.json(patient.medicalData.checkIns); 
                }) 
                .catch(error => console.log(error));
        })
        .catch(error => res.status(404).json(error));
    
});

router.put('/medicaldata', (req, res) => {
    console.log("PUT request to /medicaldata");
    var patientId = req.body._id;
    Patient.findById(patientId, (err, patient) => {
        if (err) return res.status(500).send(err);
        console.log(patient);
        console.log(req.body);

        for (var property in req.body.medicalData) {
            if (property == "provider") {
                var providerId = req.body.medicalData[property];
                patient.medicalData.providers.push(providerId);
                Provider.findById(providerId, (err, provider) => {
                    const newPatientInfo = {
                        _id: patient._id,
                        name: patient.personalData.name,
                        email: patient.personalData.email,
                    };
                    provider.medicalData.patients.push(newPatientInfo);
                    provider.save();
                });
            } else {
                patient.medicalData[property] = req.body.medicalData[property];
            }
        }

        return patient.save()
            .then(patient => {
                console.log(`Patient(id=${patient._id}) updated.`);
                console.log(`Updated Medical Data: ${patient.medicalData}`);
                res.send(patient);
        });
    });
});

module.exports = router;