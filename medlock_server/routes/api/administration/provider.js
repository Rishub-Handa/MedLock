const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Provider = require('../../../models/Provider'); 

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
    key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
}); 

const router = express.Router(); 


// @route   GET api/admin/provider
// @desc    fetches all providers
// @access  Public --> Will Change
router.get('/', (req, res) => {
    console.log("Provider GET Request");

    Provider.find({}, (err, providers) => {
        if (err) console.log(err);
        res.json(providers);
    });
}); 

// @route   POST api/admin/provider
// @desc    create new provider
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {
    console.log("Provider POST Request"); 

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

// @route   DELETE api/admin/provider
// @desc    deletes all providers
// @access Public --> Will Change
router.delete('/', (req, res) => {
    console.log("Provider DELETE Request");

    // delete chatkit account
    // delete auth0 account
    // delete medlock account

    Provider.deleteMany({}, err => console.log(err));
});

module.exports = router; 