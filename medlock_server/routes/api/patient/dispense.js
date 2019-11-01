const express = require('express'); 
const Dispenser = require('../../../models/Dispenser'); 
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
        .then(dispenseData => {
            console.log(dispenseData);
            res.json(dispenseData);
        })
        .catch(err => console.log(err)); 
});

// @route   POST api/dispense
// @desc    Update Dispenser array. 
// @access  Public --> Will Change 
router.post('/', (req, res) => {
    console.log('Dispenser POST Request ');

    // Develop mechanism to return ObjectId to dispenser 
    // Develop mechanism to return Current Time to dispenser 
    console.log(req.body); 

    var dispenser_id; 
    
    if(req.body.id == "1") {
        dispenser_id = ObjectId("000000000000000000000000"); 
    } else {
        dispenser_id = ObjectId(req.body.id); 
    }

    var lastUpdated = req.body.current_time;
    var events = req.body.events; 

    Dispenser.findById(dispenser_id, (err, dispenser) => {
        
        if (err) console.log(err); 
        // if (err) return res.status(500).send(err); 

        console.log("Searched Dispenser. "); 

        if (!dispenser) {
            dispenser = new Dispenser();
            console.log("Creating Dispenser. "); 
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
        }

        
        // res.send("Saved. "); 

        return dispenser.save()
            .then(dispenser => {
                res.send("Dispenser ID: " + dispenser._id + "\nCurrent Date: " + Date.now()); 
                console.log(dispenser); 
                console.log(Date.now()); 
                console.log("Dispense Logged.");
                console.log(dispenser);
            })
            .catch(err => console.log(err)); 

        // dispenser.save((err, dispenser) => {
        //     if(err) console.log(err); 
        //     res.send("Dispenser ID: " + dispenser._id + "\nCurrent Date: " + Date.now()); 
        //     console.log(dispenser); 
        //     console.log(Date.now()); 
        //     console.log("Dispense Logged.");
        //     console.log(dispenser); 
        // }); 



    }); 
}); 


module.exports = router; 