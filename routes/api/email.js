const express = require('express'); 
const nodemailer = require('nodemailer'); 

// CHECK BUG FOR CONNECTION TIMEOUT 
exports.sendRegistrationConfirmation = (newUser) => {
    const output = `
        <h1>MedLock</h1>
        <p>Hi ${newUser.name}</p> 
        <p>Thank you for working with MedLock. Please log in with the following password: </p> 
        <b>${newUser.password}</b> 
        <p>Best, </p> 
        <p>MedLock </p>
    `; 

    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', 
        secureConnection: true, // true for 465, false for other ports
        auth: {
          user: 'contact@medlocksolutions.com', 
          pass: 'iPNq#prkXu77' 
        }, 
        tls: {
            rejectUnauthorized: false 
        }
        });
    
    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"MedLock" <contact@medlocksolutions.com>', // sender address
        to: [newUser.email], // list of receivers
        subject: "New Account", // Subject line
        html: output // html body
    })
        .then(result => console.log(result)) 
        .catch(error => console.log(error)); 

};