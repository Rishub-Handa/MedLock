const express = require('express'); 
const Provider = require('../../../models/Provider'); 
const mongoose = require('mongoose'); 

const router = express.Router(); 

// @route GET api/provider/provider
// @desc Get provider info associated with id.
// @access public --> Will Change
router.get('/', (req, res) => {
    // Allows patients to get their own information from the Access Token 
    var id = req.user.sub.substring(6);
    Provider.findById(id)
        .then(provider => {
            console.log(provider);
            res.json(provider);
        })
        .catch(error => res.status(404).json(error));
});

// @route   POST api/provider/provider
// @desc    create new provider
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {
    console.log(req.body);

    const newProvider = new Provider({
        _id: mongoose.Types.ObjectId(req.body._id),
        name: req.body.name, 
        bio: req.body.bio, 
        patientList: req.body.patientList 
    });

    newProvider.save()
        .then(provider => {
            res.json(provider);
        });
});

// @route   PUT api/provider/provider
// @desc    update existing provider
// @access  Private, requires Auth0 Access Token 
router.put('/', (req, res) => {
    var id = req.user.sub.substring(6);
    console.log(req.body);
    Provider.findByIdAndUpdate(
        id,
        {name: req.body.newName, bio: req.body.newBio},
        {new: true, useFindAndModify: false},
        (err, provider) => {
            if (err) return res.status(500).send(err);
            console.log(provider);
            return res.send(provider); 
        });
});

module.exports = router; 