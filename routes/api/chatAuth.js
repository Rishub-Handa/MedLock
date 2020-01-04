const express = require('express'); 
const Chatkit = require('@pusher/chatkit-server'); 

const router = express.Router(); 

// Example using Express

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:b72e93e8-22d4-4227-a9f3-ad03723ca266', 
    key: '3e67a467-115d-40eb-ad91-a2293080a4ae:wsDhZD7NcvPnu6kVGeKnu/nWjRTsNloQVBCZxeTNBzw='
});
  
router.post('/', (req, res) => {

    console.log("ChatKit Authentication Request has been received. "); 
    
    // Change this later. 
    const authData = chatkit.authenticate({
        userId: req.query.user_id 
    });

    res.status(authData.status)
    .send(authData.body);

}); 

module.exports = router; 