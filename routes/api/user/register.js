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

    var user = new User({
        _id: mongoose.Types.ObjectId(newUser._id),
        personalData: {
            name: newUser.name,
            email: newUser.email
        },
    });
    return user.save().then(user => {
        console.log(`User(name=${user.name}, id=${user._id}) added to MedLock database.`);
    });
}; 

router.post('/', (req, res) => {
    console.log(`POST to /api/user/register`);
    var newUser = req.body.newUser;
    console.log(newUser);

    // generate random password for new user
    newUser = {
        ...newUser,
        password: Math.random().toString(36).slice(-12)
    };

    // register new user in Auth0
    auth.register(newUser)
        .then(r => {
            r.data.user_id;
            newUser = {
                ...newUser, 
                auth_id: r.data.user_id,
                _id: r.data.user_id.substring(6),
            }
            console.log(newUser);
            // assign role to user in Auth0
            auth.assignRole(newUser.auth_id, newUser.role)
                .then(() => console.log("role added"));
            // add user to MedLock database
            addUserToMedLockDb(newUser).then(() => {
                // send login info to new user
                email.registrationConfirmation(newUser);
                // send new user information to the client
                console.log(newUser);
                res.json(newUser);
            });
        });
});

router.post('/code', (req, res) => {
    console.log("POST request to api/user/register/code");
    // sanitize role input by converting to all lower case
    var role = req.body.role.toLowerCase();
    var registerCode = req.body.registerCode;
    console.log(role);
    console.log(registerCode);
    var correctCode;
    switch(role) {
        case roles.PATIENT:
            correctCode = "54321";
            break;
        case roles.PROVIDER:
            correctCode = "12345";
            break;
        default:
            throw new Error(`${role} is an invalid role.`);
    }
    console.log(correctCode);
    // check if register code is correct based on role
    if (registerCode === correctCode) {
        res.status(200).send(true);
    } else {
        res.status(403).send(new Error("Invalid Register Code"));
    }
});

module.exports = router;