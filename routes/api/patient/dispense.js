const express = require('express'); 
const Dispenser = require('../../../models/Dispenser'); 
const Patient = require('../../../models/Patient'); 
const mongoose = require('mongoose'); 
const { ObjectId } = require('mongodb'); 

const router = express.Router(); 

// NOT WORKING ??? 

// @route   GET api/dispense
// @desc    Get all dispenses. 
// @access  public --> Will Change
router.get('/', (req, res) => {
    console.log("Get Dispenses Data"); 
    Dispenser.findOne({ _id: req.query.id })
        .then(dispenserData => {
            console.log(dispenserData);
            if (dispenserData == null) {
                res.status(404).send("You haven't registered a dispenser. Please register a dispenser to begin logging and viewing your data.");
            } else {
                res.json(dispenserData);
            }
        })
        .catch(err => {
		console.log(err);
		res.status(500).send(err); 
	}); 
});

router.post('/film', (req, res) => {
    console.log(req.body); 
    // console.log(req); 
    console.log("Film Dispenser Endpoint. "); 
}); 

// @route   POST api/dispense
// @desc    Update Dispenser array. 
// @access  Public --> Will Change 
router.post('/', (req,res) => {
    console.log('Dispenser POST Request. '); 
    
    var dispenser_id = req.body.id; 
    var lastUpdated = req.body.current_time; 
    var events = req.body.events; 
    var code = new Array(6); var counter = 0; 

    console.log(dispenser_id); 

    if(dispenser_id == "1") {
        dispenser_id = ObjectId("000000000000000000000000"); 
        events.forEach(event => {
            if(counter < 6) { 
                switch(event.name) {
                    case "Button 1": 
                        code[counter] = 0; counter++; 
                        break; 
                    case "Button 2": 
                        code[counter] = 1; counter++; 
                        break; 
                    case "Button 3": 
                        code[counter] = 2; counter++; 
                        break; 
                    default: 
                        break; 
                }
            } 
        }); 
    } else {
        // Dispenser substring 
        dispenser_id = dispenser_id.substr(0, 24); 
    }



    Dispenser.findById(dispenser_id, (err, dispenser) => {
        
        if(err) console.log(err); 
        console.log("Searched for dispenser. "); 

        if(!dispenser && code[0] != null) {
            // Create new Dispenser and assign to Patient with corresponding code 
            // Only create Dispenser if there is a Patient with corresponding code 

            console.log("No dispenser found. "); 
            console.log(code); 

            Patient.findOne({ 'medicalData.dispenserCode': code }, (err, patient) => {
                
                if(err) console.log(err); 

                if(patient) {
                    dispenser = new Dispenser({ _id: mongoose.Types.ObjectId() }); 
                    console.log("Creating Dispenser. "); 

                    return dispenser.save()
                        .then(dispenser => {
                            patient.medicalData.dispenser_id = dispenser._id; 
                            res.send("Dispenser ID: " + dispenser._id + "\nCurrent Date: " + Date.now()); 
                            console.log("Dispense Logged.");

                            return patient.save() 
                                .then(patient => {
                                    console.log("Patient Dispenser ID: " + patient.medicalData.dispenser_id); 
                                }); 
                        })
                        .catch(err => console.log(err)); 
                } else {
                    res.send("Wrong Code. "); 
                }
            }); 

        } else if(dispenser) {
            // Add events to dispenser 

            dispenser.lastUpdated.push(new Date()); 

            events.forEach(event => {
                switch(event.name) {
                    case "Dispense": 
                        // dispenser.events.dispenses.push(new Date(lastUpdated + event.value)); 
                        dispenser.events.dispenses.push(new Date(event.value * 1000)); 
                        break; 
                    case "Button 1": 
                        dispenser.events.btn1.push(new Date(event.value * 1000)); 
                        break; 
                    case "Button 2": 
                        dispenser.events.btn2.push(new Date(event.value * 1000)); 
                        break; 
                    case "Button 3": 
                        dispenser.events.btn3.push(new Date(event.value * 1000)); 
                        break; 
                    case "Col Off": 
                        dispenser.events.collarOff.push(new Date(event.value * 1000)); 
                        break; 
                    default: 
                        break; 
                }
                
            }); 

            return dispenser.save()
            .then(dispenser => {
                res.send("Dispenser ID: " + dispenser._id + "\nCurrent Date: " + Date.now()); 
                console.log(dispenser); 
                console.log(Date.now()); 
                console.log("Dispense Logged.");
                console.log(dispenser);
            })
            .catch(err => console.log(err)); 

        } else {
            console.log("No dispenser found in the database with ID " + dispenser_id); 
            res.send("No dispenser found in the database with that ID. "); 
        }

    }); 
}); 

router.post('/button_meanings', (req, res) => {
    console.log('POST Request to /button_meanings');
    var dispenser_id = req.body.id;
    var new_meanings = req.body.meanings;
    Dispenser.findById(dispenser_id, (err, dispenser) => {
        dispenser.info.buttonMeaning = new_meanings;
        dispenser.save().then(dispenser => {
            console.log(`Button Meanings for Dispenser(id=${dispenser_id}) updated.`);
            // send updated dispenser back to client
            res.send(dispenser);
        })
        .catch(err => {
            console.log(err);
        });
    });
});








/*
router.post('/', (req, res) => {
    console.log('Dispenser POST Request ');

    // Develop mechanism to return ObjectId to dispenser 
    // Develop mechanism to return Current Time to dispenser 
    console.log(req.body); 

    var dispenser_id; 
    var lastUpdated; 
    var events; 
    
    if(req.body.code) {
        dispenser_id = ObjectId("000000000000000000000000"); 
    } else {
        dispenser_id = ObjectId(req.body.id); 
        lastUpdated = req.body.current_time; 
        events = req.body.events; 
    }

    Dispenser.findById(dispenser_id, (err, dispenser) => {
        
        if (err) console.log(err); 
        // if (err) return res.status(500).send(err); 

        console.log("Searched Dispenser. "); 

        if (!dispenser) {
            // Create new Dispenser and assign to Patient with corresponding code 
            // Only create Dispenser if there is a Patient with corresponding code 

            Patient.findOne({ 'medicalData.dispenserCode': req.body.code }, (err, patient) => {
                
                if(err) console.log(err); 

                if(patient) {
                    dispenser = new Dispenser({ _id: mongoose.Types.ObjectId() }); 
                    console.log("Creating Dispenser. "); 

                    return dispenser.save()
                        .then(dispenser => {

                            console.log("Medical Data: " + patient.medicalData); 
                            console.log(patient); 

                            patient.medicalData.dispenser_id = dispenser._id; 
                            res.send("Dispenser ID: " + dispenser._id + "\nCurrent Date: " + Date.now()); 
                            console.log(dispenser); 
                            console.log(Date.now()); 
                            console.log("Dispense Logged.");

                            return patient.save() 
                                .then(patient => {
                                    console.log("Patient Dispenser ID: " + patient.medicalData.dispenser_id); 
                                }); 
                        })
                        .catch(err => console.log(err)); 

                } else {
                    res.send("Wrong Code. "); 
                }


            }); 

            // Wrong Code 
            // Develop Dispenser Check for Wrong Code 
            // res.send("Wrong Code"); 

        } else {
            events.forEach(event => {
                switch(event.name) {
                    case "Dispense": 
                        dispenser.events.dispenses.push(new Date(lastUpdated + event.value)); 
                        break; 
                    case "Button 1": 
                        dispenser.events.btn1.push(new Date(lastUpdated + event.value)); 
                        break; 
                    case "Button 2": 
                        dispenser.events.btn2.push(new Date(lastUpdated + event.value)); 
                        break; 
                    case "Button 3": 
                        dispenser.events.btn3.push(new Date(lastUpdated + event.value)); 
                        break; 
                    case "Cap Turn": 
                        dispenser.events.capTurn.push(new Date(lastUpdated + event.value)); 
                        break; 
                    case "Col Off": 
                        dispenser.events.collarOff.push(new Date(lastUpdated + event.value)); 
                        break; 
                    default: 
                        break; 
                }
                
            }); 

            return dispenser.save()
            .then(dispenser => {
                res.send("Dispenser ID: " + dispenser._id + "\nCurrent Date: " + Date.now()); 
                console.log(dispenser); 
                console.log(Date.now()); 
                console.log("Dispense Logged.");
                console.log(dispenser);
            })
            .catch(err => console.log(err)); 

        }

        
        // res.send("Saved. "); 

        
            // if(!dispenser) {
            //     res.send("Error: Try entering the code again. "); 
            // } else {

            // } 

    
    }); 
}); 

*/

module.exports = router; 
