// Start of Server 
const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); 
const config = require('config'); 
const pdisurvey = require('./routes/api/pdisurvey'); 
const patient = require('./routes/api/patient'); 
const dispense = require('./routes/api/dispense'); 
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
        jwksUri: `https://medlock-dev.auth0.com/.well-known-jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'http://localhost:5000',
    issuer: `https://medlock-dev.auth0.com/`,
    algorithms: ['RS256']
});

// Body Parsers Middleware 
app.use(express.json()); 
app.use(cors());

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
app.use('/api/pdisurvey', checkJwt, pdisurvey); 
app.use('/api/patient', patient); 
app.use('/api/dispense', dispense); 

// Run the Server on a Port 
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Process start on port: ${PORT}`); 
}); 
