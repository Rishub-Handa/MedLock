// Start of Server 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const routes = require('./routes');


require('dotenv').config();
console.log(process.env);

const app = express(); 

// Body Parsers Middleware 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
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

