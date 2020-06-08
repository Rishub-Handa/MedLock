const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const Dispenser = require('../../../models/Dispenser');
const CheckIn = require('../../../models/CheckIn'); 
const user = require("./user");
const auth = require("../auth");
const roles = require('../roles');

const router = express.Router();

console.log('Reached Patient Endpoint');

// @route   GET api/patient/patient 
// @desc    Get patient info associated with id.
// @access  Private, requires Auth0 Access Token 
router.post('/', (req, res) => {
    const user_id = req.body.user_id;
    console.log(user_id);
    auth.fetchRoles(user_id)
        .then(response => {
	    const role_list = response.data;
            console.log("LOGGING response. "); 
	    console.log(response); 
	    if (role_list[0].name.toLowerCase() == roles.ADMIN) {
                // reroute to admin page
                console.log("LOGGING IN AS A ADMIN")
                admin = {
                    user_id,
                    roles: role_list
                };
                console.log(admin);
                res.json(admin);

            } else if (role_list[0].name.toLowerCase() == roles.PROVIDER) {
                // login as provider
                console.log("LOGGING IN AS A PROVIDER")
                var promise = user.getUserData(user_id, roles.PROVIDER);
                console.log(promise);
                promise.then(qres => {
                        provider = qres._doc;
                        // the client prepares content based on the roles of the user,
                        // so include roles in response back to client
                        provider = {
                            ...provider,
                            roles: role_list
                        };
                        console.log(provider);
                        res.json(provider);
                    }).catch(error => {
                        console.log("Promise rejected.");
                        console.log(error);
                    });

            } else if (role_list[0].name.toLowerCase() == roles.PATIENT) {
                // login as patient
                console.log("LOGGING IN AS A PATIENT");
                user.getUserData(user_id, roles.PATIENT)
                    .then(qres => {
                        patient = qres._doc
                        // the client prepares content based on the roles of the user,
                        // so include roles in response back to client
                        patient = {
                            ...patient,
                            roles: role_list
                        };
                        console.log(patient);
                        res.json(patient);
                    });
            } else {
                // throw error, valid role not found

            }
        })
    // Allows patients to get their own information from the Access Token 
});

module.exports = router;
