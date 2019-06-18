const express = require('express'); 
const Dispense = require('../../models/Dispense'); 

const router = express.Router(); 

// NOT WORKING ??? 

// @route   GET api/dispense
// @desc    Get all dispenses. 
// @access  public --> Will Change
router.get('/', (req, res) => {
    console.log("Get Dispenses Data"); 
    Dispense.findOne({ ownerId: req.user.sub })
        .then(dispenseData => res.json(dispenseData))
        .catch(err => console.log(err)); 
});

// @route   POST api/dispense
// @desc    Update dispense array. 
// @access  Public --> Will Change 
router.post('/', (req, res) => {
    console.log('Dispense POST Request ');
    console.log(req.body);
    console.log(req.user.sub); 
    const id = req.user.sub; 
    if(!Dispense.findOne({ "ownerId": id })) {
        console.log("Not Found"); 
        const newDispense = new Dispense({
            ownerId: id,  
            dipenses: []
        }); 

        newDispense.save()
            .then(dispense => console.log(`Saved Dispense. `))
            .catch(err => console.log(err)); 
    } 
    
    Dispense.updateOne(
        { "ownerId": id },
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