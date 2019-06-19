const express = require('express'); 
const PDISurvey = require('../../../models/PDISurvey'); 
const Patient = require('../../../models/Patient'); 

const router = express.Router(); 

console.log('Reached PDISurvey Endpoint'); 

// @route   GET api/pdisurvey 
// @desc    Get all survey responses for PDI Survey.  
// @access  Public --> Will Change 
router.get('/', (req, res) => {
    /* Query PDISurvey Collection 
    console.log('GET Request'); 
    // Finds all survey responses, so find() does not have search parameters 
    PDISurvey.find({ 'ownerId': req.user.sub })
        .sort({ date: -1 })
        .then(survey => res.json(survey)); 
    */ 

    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => {
            // Return all PDISurveys in the patient. 
            res.json(patient.surveys.pdiSurveys); 
        })
        .catch(error => res.status(404).json(error));
}); 

// @route   POST api/pdisurvey 
// @desc    Create a PDISurvey 
// @access  Public --> Will Change 
router.post('/', (req, res) => {
    console.log('POST Request'); 
    // Create a new MongoDB Schema Model 
    // The date is default created with Date.now
    /* Query PDISurvey Collection 
    const newPDISurvey = new PDISurvey({
        ownerId: req.user.sub,
        responses: req.body 
    }); 

    // If the save works asynchronously, then return the JSON of the saved survey. 
    newPDISurvey.save()
        .then(survey => {
            console.log("Survey -> Database ");
            res.json(survey); 
        }); 
    */ 

    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => {
            // Return all PDISurveys in the patient. 
            const newPDISurvey = new PDISurvey({
                ownerId: req.user.sub,
                responses: req.body 
            }); 

            patient.surveys.pdiSurveys.push(newPDISurvey); 

            patient.save() 
                .then(patient => {
                    res.json(patient.surveys.pdiSurveys); 
                }) 
                .catch(error => console.log(error)); 

            
        })
        .catch(error => res.status(404).json(error));

}); 

// Should the patient be allowed to delete the survey response ??? 

// @route   DELETE api/pdisurvey 
// @desc    Delete a PDI Survey response 
// @access  Public --> Will Change 
// router.delete('/:id', (req, res) => {
    
//     // Find the item in the database by id. 
//     PDISurvey.findById(req.params.id)
//         .then(survey => survey.remove() // If the survey is found, then remove it. Remove is a function of the Mongoose Model. 
//             .then(() => res.json({ success: true }))) // If removed, then return that delete succeeded. 
//         .catch(err => res.status(404).json({ success: false })); 
// }); 

module.exports = router; 
