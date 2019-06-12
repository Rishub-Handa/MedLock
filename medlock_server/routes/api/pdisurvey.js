const express = require('express'); 
const PDISurvey = require('../../models/PDISurvey'); 

const router = express.Router(); 

console.log('Reached PDISurvey Endpoint'); 

// @route   GET api/pdisurvey 
// @desc    Get all survey responses for PDI Survey.  
// @access  Public --> Will Change 
router.get('/', (req, res) => {
    console.log('Get Request'); 
    // Finds all survey responses, so find() does not have search parameters 
    PDISurvey.find({ 'ownerId': req.user.sub })
        .sort({ date: -1 })
        .then(survey => res.json(survey)); 
}); 

// @route GET api/pdisurvey/:userId
// @desc Get survey responses for specific user.
// @access Public --> Will Change
//router.get('/:userId', (req, res) => )

// @route   POST api/pdisurvey 
// @desc    Create a PDISurvey 
// @access  Public --> Will Change 
router.post('/', (req, res) => {
    console.log('Post Request'); 
    // Create a new MongoDB Schema Model 
    // The date is default created with Date.now
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

}); 

// @route   DELETE api/pdisurvey 
// @desc    Delete a PDI Survey response 
// @access  Public --> Will Change 
router.delete('/:id', (req, res) => {
    
    // Find the item in the database by id. 
    PDISurvey.findById(req.params.id)
        .then(survey => survey.remove() // If the survey is found, then remove it. Remove is a function of the Mongoose Model. 
            .then(() => res.json({ success: true }))) // If removed, then return that delete succeeded. 
        .catch(err => res.status(404).json({ success: false })); 
}); 

module.exports = router; 
