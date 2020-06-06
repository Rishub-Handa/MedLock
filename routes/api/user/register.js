const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const Provider = require('../../../models/Provider');
const Dispenser = require('../../../models/Dispenser');
const CheckIn = require('../../../models/CheckIn'); 
const user = require("./user");
const auth = require("../auth");
const email = require("../email");
const roles = require('../roles');

const router = express.Router();

console.log('Reached Register Endpoint');

/**
 * @param {*} newUser object with Auth0  
 */
const addUserToMedLockDb = (newUser) => {
    console.log(`adding user(name=${newUser.name}, id=${newUser._id}) to MedLock database`);
    // sanitize role input by converting to all lower case
    const userRole = newUser.role.toLowerCase();

    // assign User to the Patient or Provider model based on the user role.
    var User;
    switch(userRole) {
        case roles.PATIENT: 
            User = Patient;
            break;
        case roles.PROVIDER:
            User = Provider;
            break;
        default: 
            throw new Error(`${userRole} is not a valid role.`);
    }

    const newUser = new User({
        _id: mongoose.Types.ObjectId(newUser._id),
        personalData: {
            name: newUser.name,
            email: newUser.email
        },
    });
    return newUser.save().then(newUser => {
        console.log(`User(name=${newUser.name}, id=${newUser._id}) added to MedLock database.`);
    });
}; 

router.post('/', (req, res) => {
    console.log(`POST to /api/user/register, req.body=${req.body}`);
    const newUser = req.body.newUser;

    // generate random password for new user
    newUser = {
        ...newUser,
        password: Math.random().toString(36).slice(-12)
    };

    // register new user in Auth0
    auth.register(newUser)
        .then(res => {
            res.data.user_id;
            newUser = {
                ...newUser, 
                auth_id: res.data.user_id,
                _id: res.data.user_id.substring(6),
            }
            // assign role to user in Auth0
            auth.assignRole(newUser.auth_id, newUser.role);
            // add user to MedLock database
            addUserToMedLockDb(newUser).then(() => {
                // send login info to new user
                email.registrationConfirmation(newUser);
                // send new user information to the client
                res.json(newUser);
            });
        });
});