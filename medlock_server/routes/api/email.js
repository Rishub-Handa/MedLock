const express = require('express'); 
const nodemailer = require('nodemailer'); 

const router = express.Router(); 

// CHECK BUG FOR CONNECTION TIMEOUT 
router.post('/', (req, res) => {
    console.log(req.body); 
    const output = `
        <h1>MedLock</h1>
        <p>Hi ${req.body.name}</p> 
        <p>Thank you for working with MedLock. Please log in with the following password: </p> 
        <b>${req.body.password}</b> 
        <p>Best, </p> 
        <p>MedLock </p>
    `; 

    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'medlockers@gmail.com', 
          pass: 'freakysnowman2019' 
        }, 
        tls: {
            rejectUnauthorized: false 
        }
        });
    
    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"MedLock" <medlockers@gmail.com>', // sender address
        to: [req.body.email], // list of receivers
        subject: "New Account", // Subject line
        html: output // html body
    })
        .then(result => console.log(result)) 
        .catch(error => console.log(error)); 

})


module.exports = router; 