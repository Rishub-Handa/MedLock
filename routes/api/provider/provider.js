const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Provider = require('../../../models/Provider'); 

const router = express.Router(); 

// TEST ALL METHODS 

// @route GET api/provider/provider
// @desc Get provider info associated with id.
// @access public --> Will Change
router.get('/', (req, res) => {
    // Allows patients to get their own information from the Access Token 
    var id = req.user.sub.substring(6);
    console.log(id);
    Provider.findById(id)
        .then(provider => {
            console.log(`Provider: ${provider}`);
            if(provider) {
                res.json(provider); 
            } else {
                res.status(404).send("Not Found"); 
            }
        })
        .catch(error => res.status(404).send("Not Found"));
});

// @route   POST api/provider/provider
// @desc    create new provider
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {
    console.log("Provider POST Request"); 

    const chatkit = new Chatkit.default({
        instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
        key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
    });

    chatkit.createUser({
        id: req.body._id, 
        name: req.body.personalData.name 
    }); 

    const newProvider = new Provider({
        _id: mongoose.Types.ObjectId(req.body._id),
        personalData: req.body.personalData
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
    var providerId = req.user.sub.substring(6);
    Provider.findById(providerId, (err, provider) => {
        if (err) return res.status(500).send(err);

        for (var property in req.body) {
            provider.personalData[property] = req.body[property];
        }

        return provider.save()
            .then(provider => {
                console.log("Provider Updated.");
                console.log(provider.personalData);
                res.send(provider.personalData);
            });
    });

});

router.put('/medicaldata', (req, res) => {
    var providerId = req.body._id;
    Provider.findById(providerId, (err, provider) => {
        if (err) return res.status(500).send(err);

        for (var property in req.body.medicalData) {
            provider.medicalData[property] = req.body.medicalData[property];
        }

        return provider.save()
            .then(provider => {
                console.log(`Provider(id=${provider._id}) updated.`);
                console.log(`Updated Medical Data: ${provider.medicalData}`);
                res.send(provider.medicalData);
            })
    })
});

module.exports = router; 