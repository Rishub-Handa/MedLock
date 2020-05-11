const Patient = require('../../../models/Patient');
const Provider = require('../../../models/Provider');

exports.getUserData = function getUserData(user_id, role) {
    console.log(user_id);
    user_id = user_id.substring(6);
    console.log(user_id);
    if (role.toLowerCase() == "patient") {
        return Patient.findById(user_id).exec();
    } else if (role.toLowerCase() == "provider") {
        return Provider.findById(user_id).exec();
    } else {
        // invalid role
    }
};