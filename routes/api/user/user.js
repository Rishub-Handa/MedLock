const Patient = require('../../../models/Patient');
const Provider = require('../../../models/Provider');
const roles = require('../roles');

exports.getUserData = function getUserData(user_id, role) {
    console.log(user_id);
    user_id = user_id.substring(6);
    console.log(user_id);
    if (role.toLowerCase() == roles.PATIENT) {
        console.log(`GET USER DATA FOR PATIENT(ID=${user_id})`);
        return Patient.findById(user_id).exec();
    } else if (role.toLowerCase() == roles.PROVIDER) {
        console.log(`GET USER DATA FOR PROVIDER(ID=${user_id})`);
        return Provider.findById(user_id).exec();
    } else {
        // invalid role
    }
};