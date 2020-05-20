const express = require('express'); 
const ExitSurvey = require('../../../../models/ExitSurvey'); 
const Patient = require('../../../../models/Patient'); 

const router = express.Router(); 

router.post('/', (req, res) => {
    var id = req.user.sub.substring(6);
    console.log("POST Exit Survey"); 
    console.log(req.body); 

    Patient.findById(id)
        .then(patient => {
            const newExitSurvey = new ExitSurvey({
                responses: req.body, 
            }); 
            patient.medicalData.surveys.exitSurvey.push(newExitSurvey); 
            patient.save() 
                .then(patient => {
                    res.json(patient.medicalData.surveys.exitSurvey); 
                }) 
                .catch(error => console.log(error));
        })
        .catch(error => res.status(404).json(error));

}); 


module.exports = router; 