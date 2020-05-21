// Start of Server 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
// const path = require('path'); 
// const config = require('config'); 
// const patient = require('./routes/api/patient/patient'); 
// const pdisurvey = require('./routes/api/patient/pdisurvey'); 
// const dispense = require('./routes/api/patient/dispense'); 
// const chatAuth = require('./routes/api/chatAuth'); 
// const email = require('./routes/api/email'); 
// const provider = require('./routes/api/provider/provider'); 
// const providerPatients = require('./routes/api/provider/patients'); 
// const adminProvider = require('./routes/api/administration/provider'); 
// const adminPatient = require('./routes/api/administration/patient');
// const jwt = require('express-jwt');
// const jwksRsa = require('jwks-rsa');
const routes = require('./routes');
// const jwtAuthz = require('express-jwt-authz');
// const cors = require('cors'); 
require('dotenv').config();
console.log(process.env);

const app = express(); 

// Body Parsers Middleware 
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(cors()); TODO: this is a security risk, make sure it works without this

var logger = function(req, res, next) {
    console.log(req);
    next();
}

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

app.use(express.static('client/build'));

// Route the request to an endpoint 
app.use(routes);

// Run the Server on a Port 
const PORT = process.env.PORT || 5000; 

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Process started on port ${PORT}.`); 
}); 

