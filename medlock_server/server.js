// Start of Server 
const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); 
const config = require('config'); 
const pdisurvey = require('./routes/api/pdisurvey'); 
const patient = require('./routes/api/patient'); 
const dispense = require('./routes/api/dispense'); 

const app = express(); 

// Body Parsers Middleware 
app.use(express.json()); 

const db = 'mongodb+srv://chase:chase123@patient-data-4fcpy.mongodb.net/patient-datadb?retryWrites=true&w=majority'

// Connect to MongoDB 
mongoose.connect(db, {
    useNewUrlParser: true, 
    useCreateIndex: true 
}) 
    .then(() => {
        console.log("MongoDB Connected. "); 
    }) 
    .catch(err => {
        console.log(err); 
    }); 

// Use Routes 
// Send this /api/pdisurvey endpoint to pdisurvey.js 
app.use('/api/pdisurvey', pdisurvey); 
app.use('/api/patient', patient); 
app.use('/api/dispense', dispense); 

// Run the Server on a Port 
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Process start on port: ${PORT}`); 
}); 
