const express = require('express'); 
const Provider = require('../../../models/Provider'); 
const mongoose = require('mongoose'); 

const router = express.Router(); 

// @route   POST api/admin/provider
// @desc    create new provider
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {
    console.log("Provider POST Request")

    const newProvider = new Provider({
        _id: mongoose.Types.ObjectId(req.body._id),
        personalData: req.body.personalData
    });

    newProvider.save()
        .then(provider => {
            res.json(provider);
        });
});

module.exports = router; 