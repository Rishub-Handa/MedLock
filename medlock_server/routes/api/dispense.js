const express = require('express'); 
const Dispense = require('../../models/Dispense'); 

const router = express.Router(); 

// @route   GET api/dispense
// @desc    Get all dispenses. 
// @access  public --> Will Change
router.get('/', (req, res) => {
    console.log("Get Dispenses Data"); 
    Dispense.findOne({ _id: req.query.id })
        .then(dispenseData => res.json(dispenseData))
        .catch(err => console.log(err)); 
});

// @route   POST api/dispense
// @desc    Update dispense array. 
// @access  Public --> Will Change 
router.post('/', (req, res) => {
    console.log('Dispense POST Request ');
    console.log(req.body);
    if(!Dispense.findById(req.body.id)) {
        console.log("Not Found"); 
        const newDispense = new Dispense({
            _id: req.body.id,  
            dipenses: []
        }); 

        newDispense.save()
            .then(dispense => console.log("Saved. "))
            .catch(err => console.log(err)); 
    } 
    
    Dispense.updateOne(
        { "_id": req.body.id },
        { "$push": 
            {"dispenses": 
                {
                    "date": req.body.date,
                    "time": req.body.time
                }
            }
        }
    ) 
        .then(dispense => console.log("Updated. "))
        .catch(err => console.log(err)); 

    res.json({msg: "posting"}); 
});


module.exports = router; 