// Start of Server 
const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); 
const config = require('config'); 
const pdisurvey = require('./routes/api/patient/pdisurvey'); 
const patient = require('./routes/api/patient/patient'); 
const dispense = require('./routes/api/patient/dispense'); 
const chatAuth = require('./routes/api/chatAuth'); 
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors'); 

const app = express(); 

// Authentication middleware. When used, the 
// Access Token must exist and be verified against 
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://medlock-dev.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'http://localhost:5000',
    issuer: `https://medlock-dev.auth0.com/`,
    algorithms: ['RS256']
});

// Body Parsers Middleware 
app.use(express.json()); 
app.use(cors());

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

// Route the request to an endpoint 
app.use('/api/pdisurvey', checkJwt, pdisurvey); 
app.use('/api/patient', checkJwt, patient); 
app.use('/api/dispense', checkJwt, dispense); 

// How will chatAuth authenticate with Auth0 ??? 
// Cannot use checkJwt because the ChatKit server will also make a request to this endpoint without Auth0. 
app.use('/api/chatAuth', chatAuth); 

// Run the Server on a Port 
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Process start on port: ${PORT}`); 
}); 
