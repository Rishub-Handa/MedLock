const express = require('express'); 
const Dispenser = require('../../../models/Dispenser'); 
const mongoose = require('mongoose');

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
    var dispenser_id = req.body.id;

    Dispenser.findById(dispenser_id, (err, dispenser) => {
        if (err) return res.status(500).send(err);
        if (!dispenser) {
            dispenser = new Dispenser({
                _id: mongoose.Types.ObjectId(dispenser_id)
            });
        }
        dispenser.dispenses.push(req.body.timestamp);
        return dispenser.save()
            .then(dispenser => {
                console.log("Dispense Logged.");
                console.log(dispenser);
            });
    })

    // Dispenser.findById(req.body.id, (err, res) => {
    //     if (err) return console.log(err);
    //     if (!res) {
    //         const newDispenser = new Dispenser({
    //             _id: mongoose.Types.ObjectId(req.body.id),
    //             dispenses: []
    //         });

    //         newDispenser.save()
    //             .then(Dispenser => {
    //                 console.log(`New dispenser with id=${req.body.id} created and saved.`);
    //                 addDispense(req.body);
    //             })
    //             .catch(err => console.log(err));
    //     } else {
    //         addDispense(req.body);
    //     }
    // });
});

const addDispense = body => {
    console.log(body);
    Dispenser.updateOne(
        { "_id": body.id },
        { "$push": 
            {"dispenses": 
                {
                    "timestamp": body.timestamp
                }
            }
        }
    )
        .then(Dispenser => console.log("Updated. "))
        .catch(err => console.log(err));
}

module.exports = router; 