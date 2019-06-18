const express = require('express'); 
const Dispense = require('../../models/Dispense'); 
const mongoose = require('mongoose');

const router = express.Router(); 

// @route   GET api/dispense
// @desc    Get all dispenses. 
// @access  public --> Will Change
router.get('/', (req, res) => {
    console.log("Get Dispenses Data"); 
    Dispense.findOne({ _id: req.query.id })
        .then(dispenseData => {
            console.log(dispenseData);
            res.json(dispenseData);
        })
        .catch(err => console.log(err)); 
});

// @route   POST api/dispense
// @desc    Update dispense array. 
// @access  Public --> Will Change 
router.post('/', (req, res) => {
    console.log('Dispense POST Request ');
    console.log(req.body);

    Dispense.findById(req.body.id, (err, res) => {
        if (err) return console.log(err);
        if (!res) {
            const newDispense = new Dispense({
                _id: mongoose.Types.ObjectId(req.body.id),
                dispenses: []
            });

            newDispense.save()
                .then(dispense => {
                    console.log(`New dispenser with id=${req.body.id} created and saved.`);
                    addDispense(req.body);
                })
                .catch(err => console.log(err));
        } else {
            addDispense(req.body);
        }
    });
});

const addDispense = body => {
    Dispense.updateOne(
        { "_id": body.id },
        { "$push": 
            {"dispenses": 
                {
                    "date": body.date,
                    "time": body.time
                }
            }
        }
    )
        .then(dispense => console.log("Updated. "))
        .catch(err => console.log(err));
}

module.exports = router; 