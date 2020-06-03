const express = require('express'); 
const mongoose = require('mongoose'); 
const Patient = require('../../../models/Patient');
const Document = require('../../../models/Document');
const router = express.Router();

// for file upload
var fs = require('fs');
var path = require('path');
var async = require('async');
// var cmd = require('node-cmd');

// multer is middleware used to handle multipart form data
const multer = require('multer'); 
var multerupload = multer({ dest: 'uploads/' });

console.log('Reached api/patient/documents endpoint');

// @route   POST api/patient/documents
// @desc    Upload new document to patient profile
// @access  Private, requires an Auth0 Access Token
router.post('/upload', multerupload.any(), (req, res) => {
    console.log("POST request to api/patient/documents");
    console.log(req.body);

    var filesArray = req.files;
    // print files array
    console.log(filesArray)
    async.each(filesArray, (file, eachcallback) => {
        // do something for each file
    }, (error) => {
        if (error) {
            console.log('error has occurred in each', error);
        } else {
            console.log('finished processing');
            res.send({
                "code":"200",
                "success":"files printed successfully"
            });
            //cmd.run('rm -rf ./fileupload/*')
        }
    });

    for (var i in req.body.documents) {
        console.log(req.body.documents[i].data);
    }
});

module.exports = router;