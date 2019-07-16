
const deletePatientMongo = (_id) => {
    Patient.findOne({_id : _id}, 
        (err, result) => {

            const deletedPatient = result;

            if(err) {console.log(`Error: ${err}`)}
            
            //Deletes Dispenser From MongoDB Database
            if(result.medicalData.dispenser_id) {
                Dispenser.findByIdAndDelete({dispenser_id : result.medicalData.dispenser_id})
                    .then(() => console.log("DELETED DISPENSER FROM DATABASE"))
                    .catch((err) => console.log(`Error Code: ${err}`));
            }  

            //Loops Through Patient's Providers And Deletes It From Their Lists
            for(var i = 0; i < result.medicalData.providers.length; i++)
            {
                console.log("REACHED INSIDE OF FOR LOOP");
                Provider.findOne({_id: result.medicalData.providers[i]}, 
                    (err, result) => {

                        console.log("FOUND PROVIDER:" + result.personalData.name);

                        if(err) {console.log(`Error: ${err}`)}

                        var newPatients = result.medicalData.patients.filter((value) => {
                            return value._id != _id;
                        })

                        result.medicalData.patients = newPatients;
                        console.log("RESULT PATIENTS:" + result.medicalData.patients);
                        console.log(`FILTERED PATIENTS: ${newPatients}`);
                        result.save()
                            .then()
                            .catch((err) => console.log(err));



                    //Deletes Patient After Deleting Them From Provider's Patient List
                    }).then(() => {

                        Patient.findByIdAndDelete({_id : _id})
                        .then(() => console.log("DELETED PATIENT FROM DATABASE"))
                        .catch((err) => console.log(`Error Code: ${err}`));

                    }).catch((err) => {console.log(err)});
            }
        }).then().catch((err) => {console.log(err)});
        return deletedPatient;
}

const deleteAllPatientsMongo = () => {
    Patient.deleteMany({}, err => console.log(err));
    //Work on later (maybe) -> delete all patients from providers' patients lists
    //Provider.update({}, )
    Dispenser.deleteMany({}, err => console.log(err));
}

const deletePatientChatKit = (_id) => {
    chatkit.deleteUser({id: _id,})
            .then(curUser => {console.log(`User ${_id} Deleted Successfully From Chatkit`)})
            .catch(err => {console.log("Failed To Find/Delete User From Chatkit")});
}

const addPatientCreateChat = (req, res, providerId, patientId) => {

    // Add patient to Provider patient list. 
    Provider.findById(providerId, (err, provider) => {
        console.log("Reached");
        console.log(req.body); 
        if (err) return res.status(500).send(err);
        const newPatient = {
            _id: patientId, 
            name: req.body.personalData.name, 
            email: req.body.personalData.email 
        };
        console.log(newPatient);

        // Check if newPatient exists in array. 
        console.log(`Provider Patient List: ${provider.medicalData.patients}`); 
        let contains = false; 

        provider.medicalData.patients.forEach(patient => {
            console.log(patient._id); 
            if("" + patient._id === "" + patientId)  
                contains = true; 
        })

        console.log(contains); 
        if(!contains) {

            // If the provider has not already registered with the patient, create a chat. 

            // TODO: Create field to transmit patient name. 
            // Have all joinable rooms display 
            // Have providers search for joinable rooms 

            chatkit.createRoom({
                creatorId: providerId,
                name: `${req.body.personalData.name} + ${provider.personalData.name}`,
                isPrivate: true, 
                userIds: [patientId] 
            })
                .then(() => {
                  console.log('Room created successfully');
                }).catch((err) => {
                  console.log(err);
                });


            provider.medicalData.patients.push(newPatient);
            provider.save()
                .then(provider => {
                    console.log(`Patient with id=${newPatient._id} added to patient list of Provder with id=${providerId}.`);
                })
                .catch(error => console.log(error));
        }
    });
}

module.exports = deleteAllPatientsMongo, deletePatientChatKit, deletePatientMongo, addPatientCreateChat;
