const express = require('express'); 
const Dispense = require('../../../models/Dispense'); 
const { Provider } = require('../../../models/Provider'); 
const { PatientInfo } = require('../../../model/Provider'); 
const PDISurvey = require('../../../models/PDISurvey'); 

const router = express.Router(); 

// @route   GET api/provider/patientInfo 
// @desc    Get patient information if in provider patientList. 
// @access  Private, requires Auth0 Access Token 
router.get('/:id', (req, res) => {

    const id = req.user.sub.substring(6);

    Provider.findById(id)
        .then(provider => {

           
            // Check this query ??? 
            provider.findOne({ "patientList.patient_id": req.params.id }) 
                .then(patient => {
                    switch(req.query.type) {
                        case profile: 
                            // Not sure what data to return. 
                            // Construct an object with only the required data to return. 
                            res.json(patient); 
                            break; 
                        case surveys: 
                            res.json(patient.surveys); 
                            break; 
                        case dispenser: 
                            Dispense.findById(patient.dispenser_id) 
                                .then(dispenses => res.json(dispenses)) 
                                .catch(error => res.status(404).json(error)); 
                            break; 
                        default: 
                            res.json({ message: "Choose a Type: profile, surveys, dispenser. "})
                    }
                }) 
                .catch(error => {
                    res.status(404).json(error); 
                    console.log("Patient is not in Provider patientList. "); 
                }); 
        })
        .catch(error => res.status(404).json(error));
}); 

// @route   POST api/provider/patientInfo
// @desc    Add dispenses and surveys patient information to the patient collection. 
// @access  Private, requires Auth0 Access Token 
router.post('/:id', (req, res) => {

    const id = req.user.sub.substring(6);

    Provider.findById(id)
        .then(provider => {

            // Check this query ??? 
            provider.findOne({ "patientList.patient_id": req.params.id }) 
                .then(patient => {
                    switch(req.query.type) {
                        case pdiSurvey: 
                            const newPDISurvey = new PDISurvey(req.body.pdiSurvey); 
                            patient.surveys.pdiSurveys(newPDISurvey); 
                            patient.save() 
                                .then(patient => res.json(patient.surveys.pdiSurveys)) 
                                .catch(error => console.log(error)); 
                            break; 
                        case dispenser: 
                            Dispense.findById(patient.dispenser_id, (err, res) => {
                                if (err) return console.log(err);
                                if (!res) {
                                    const newDispense = new Dispense({
                                        _id: mongoose.Types.ObjectId(patient.dispenser_id),
                                        dispenses: []
                                    });
                        
                                    newDispense.save()
                                        .then(dispense => {
                                            addDispense(req.body, patient.dispenser_id);
                                        })
                                        .catch(err => console.log(err));
                                } else {
                                    addDispense(req.body, patient.dispenser_id);
                                }
                            });
                            break; 
                        default: 
                            res.json({ message: "Choose a Type: profile, surveys, dispenser. "})
                    }
                }) 
                .catch(error => {
                    res.status(404).json(error); 
                    console.log("Patient is not in Provider patientList. "); 
                }); 
        })
        .catch(error => res.status(404).json(error));

});

const addDispense = (body, dispenser_id) => {
    Dispense.updateOne(
        { "_id": dispenser_id },
        { "$push": 
            {"dispenses": 
                {
                    "date": body.date,
                    "time": body.time
                }
            }
        }
    )
        .then(dispense => console.log("Updated. "))
        .catch(err => console.log(err));
}

// @route   DELETE api/provider/patientInfo 
// @desc    Delete patient information if in provider patientList. 
// @access  Private, requires Auth0 Access Token 
router.get('/:id', (req, res) => {

    const id = req.user.sub.substring(6);

    Provider.findById(id)
        .then(provider => {
        
            // Check this query ??? 
            provider.findOne({ "patientList.patient_id": req.params.id }) 
                .then(patient => {
                    switch(req.query.type) {
                        case pdiSurvey: 
                            // How to query an array ??? 
                            patient.surveys.pdiSurvey.findOneAndDelete(
                                { "date": req.body.date }
                            )
                            break; 
                        case dispenser: 
                            Dispense.findById(patient.dispenser_id) 
                                .then(dispenses => {
                                    dispenses.findOneAndDelete({
                                        "date": req.body.date, 
                                        "time": req.body.time 
                                    })
                                }) 
                                .catch(error => res.status(404).json(error)); 
                            break; 
                        default: 
                            res.json({ message: "Choose a Type: profile, surveys, dispenser. "})
                    }
                }) 
                .catch(error => {
                    res.status(404).json(error); 
                    console.log("Patient is not in Provider patientList. "); 
                }); 
        })
        .catch(error => res.status(404).json(error));
}); 

