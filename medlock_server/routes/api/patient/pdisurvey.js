const express = require('express'); 
const PDISurvey = require('../../../models/PDISurvey'); 
const Patient = require('../../../models/Patient'); 

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
    // Create a new MongoDB Schema Model 
    // The date is default created with Date.now
    /* Query PDISurveySchema Collection 
    const newPDISurveySchema = new PDISurveySchema({
        ownerId: req.user.sub,
        responses: req.body 
    }); 

    // If the save works asynchronously, then return the JSON of the saved survey. 
    newPDISurveySchema.save()
        .then(survey => {
            console.log("Survey -> Database ");
            res.json(survey); 
        }); 
    */ 

    var id = req.user.sub.substring(6);
    // Patient.findById(id, (err, patient) => {
    //     if (err) return res.status(500).send(err);
    //     if (!patient) return res.status(404).send("Patient not found.");
    //     const newPDISurvey = new PDISurvey({
    //         responses: req.body
    //     });
    //     console.log(patient);
    //     patient.medicalData.surveys.pdiSurveys.push(newPDISurvey);
    //     return patient.save()
    //         .then(patient => {
    //             console.log("PDISurvey Saved.");
    //             console.log(patient);
    //         });
    // });

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

// Should the patient be allowed to delete the survey response ??? 

// @route   DELETE api/PDISurveySchema 
// @desc    Delete a PDI Survey response 
// @access  Public --> Will Change 
// router.delete('/:id', (req, res) => {
    
//     // Find the item in the database by id. 
//     PDISurveySchema.findById(req.params.id)
//         .then(survey => survey.remove() // If the survey is found, then remove it. Remove is a function of the Mongoose Model. 
//             .then(() => res.json({ success: true }))) // If removed, then return that delete succeeded. 
//         .catch(err => res.status(404).json({ success: false })); 
// }); 

module.exports = router; 
