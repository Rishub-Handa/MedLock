const express = require('express'); 
const { Provider } = require('../../../models/Provider'); 
const { PatientInfo } = require('../../../models/Provider'); 

// Update Patient Info 

// @route   GET api/provider/allPatients 
// @desc    Get all patients general information associated with provider.
// @access  Private, requires Auth0 Access Token 
router.get('/', (req, res) => {

    const id = req.user.sub.substring(6);

    Provider.findById(id)
        .then(provider => {
            res.json(provider.patientList); 
        })
        .catch(error => res.status(404).json(error));
}); 

// @route   POST api/provider/allPatients
// @desc    Add a patient to the provider patientList 
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {

    const id = req.user.sub.substring(6);
    Provider.findById(id)
        .then(provider => {
            // Return all PDISurveys in the patient. 
            const newPatient = new PatientInfo({
                // Should this include the patient name or keep data anonymized 
                patientId: req.body.patientId,
                medicalData: req.body.medicalData 
            }); 

            provider.patientList.push(newPatient); 

            provider.save() 
                .then(provider => {
                    res.json(newPatient); 
                }); 

        })
        .catch(error => res.status(404).json(error));

});

// @route   DELETE api/provider/allPatients 
// @desc    Delete a patient from provider patientList 
// @access  Private, requires Auth0 Access Token  
router.delete('/:id', (req, res) => { 

    // Might fix later 
    const id = req.user.sub.substring(6); 
    Provider.update({
        "_id": id 
        }, 
        {
            "$pull": { "patientList": { "patientId": req.params.id }}
        }) 
    
}); 



