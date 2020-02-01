const express = require('express'); 
const IntakeSurvey = require('../../../../models/IntakeSurvey'); 
const Patient = require('../../../../models/Patient'); 

const router = express.Router(); 

router.post('/', (req,res) => {
    console.log('Intake POST Request. '); 

    console.log(req.body); 

    var id = req.user.sub.substring(6);

    Patient.findById(id)
        .then(patient => {
            const newIntakeSurvey = new IntakeSurvey({
                responses: req.body, 
            }); 

            patient.medicalData.surveys.intakeSurvey.push(newIntakeSurvey); 

            patient.save() 
                .then(patient => {
                    res.json(patient.medicalData.surveys.intakeSurvey); 
                }) 
                .catch(error => console.log(error));
        })
        .catch(error => res.status(404).json(error));

}); 

router.get('/', (req, res) => {
    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => {
            res.json(patient.medicalData.surveys.intakeSurvey); 
        })
        .catch(error => res.status(404).json(error));
}); 

module.exports = router; 