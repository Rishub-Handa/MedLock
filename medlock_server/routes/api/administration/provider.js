const express = require('express'); 
const mongoose = require('mongoose'); 
const Chatkit = require('@pusher/chatkit-server'); 
const Provider = require('../../../models/Provider'); 
const Patient = require('../../../models/Patient');

const servers = require('../../../config/servers');
const { MEDLOCK_AUTH0 } = servers;

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
    key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
}); 

const axios = require('axios');
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

    const ids = req.body.ids;
    const AMT = req.body.AMT;
    console.log(ids);
    ids.forEach(id => {
        deleteUser(id, AMT);
        console.log(`deleted provider(id=${id})`);
    });
});

const deleteUser = (id, AMT) => {
    deleteProviderMongo(id);
    deleteProviderChatKit(id);
    deleteUserFromAuth0(id, AMT);
}

const deleteProviderMongo = (providerId) => {
    console.log(`deleting user(id=${providerId}) from MedLock db`);
    Provider.findByIdAndDelete(providerId, (err, deletedProvider) => {
        if (err) console.log(`MedLock: ${err}`);

        deletedProvider.medicalData.patients.forEach(patient => {
            Patient.findOne({ _id: patient._id }, (err, patient) => {
                if (err) console.log(err);
                const newProviderList = patient.medicalData.providers.filter(id => id != providerId);
                patient.medicalData.providers = newProviderList;
                patient.save()
                    .then(() => console.log(`patient(id=${patient._id} and provider(id=${providerId}) unlinked`));
            });
        });
    });
}

const deleteProviderChatKit = (id) => {
    console.log(`deleting user(id=${id}) from ChatKit`);
    chatkit.deleteUser({ id: id,})
            .then((user) => console.log(`user(id=${id}) deleted from ChatKit`))
            .catch(err => console.log(`ChatKit: ${err}`));
}

const deleteUserFromAuth0 = (userId, AMT) => {
    userId = "auth0|" + userId;
    console.log(`deleting user(id=${userId}) from Auth0`);
    var url = `${MEDLOCK_AUTH0}/v2/users/${userId}`;
    const headers = { authorization: `Bearer ${AMT}`};
    axios.delete(url, { headers })
        .then(() => console.log(`user(id=${userId}) deleted from Auth0`))
        .catch(err => console.log(`Auth0: ${err}`));
}

module.exports = router; 