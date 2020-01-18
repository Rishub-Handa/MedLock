const express = require('express'); 
const PDISurvey = require('../../../../models/PDISurvey'); 
const Patient = require('../../../../models/Patient'); 

const router = express.Router(); 

console.log('Reached PDISurvey Endpoint'); 

// @route   GET api/PDISurveySchema 
// @desc    Get all survey responses for PDI Survey.  
// @access  Public --> Will Change 
router.get('/', (req, res) => {
    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => {
            // Return all PDISurveySchemas in the patient. 
            res.json(patient.medicalData.surveys.pdiSurveys); 
        })
        .catch(error => res.status(404).json(error));
}); 

// @route   POST api/PDISurveySchema 
// @desc    Create a PDISurveySchema 
// @access  Public --> Will Change 
router.post('/', (req, res) => {
    console.log('PDISurvey POST Request'); 

    var id = req.user.sub.substring(6);

    Patient.findById(id)
        .then(patient => {

            // Create new PDISurvey from the responses.
            const newPDISurvey = new PDISurvey({
                responses: req.body, 
            }); 

            patient.medicalData.surveys.pdiSurveys.push(newPDISurvey); 

            patient.save() 
                .then(patient => {
                    res.json(patient.medicalData.surveys.pdiSurveys); 
                }) 
                .catch(error => console.log(error));
        })
        .catch(error => res.status(404).json(error));

}); 

module.exports = router; 
