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

// @route   POST api/patient/documents/upload
// @desc    Upload new document to patient profile
// @access  Private, requires an Auth0 Access Token
router.post('/upload', multerupload.any(), (req, res) => {
    console.log("POST request to api/patient/documents");
    console.log(req);
    var patientId = req.user.sub.substring(6);
    var filesArray = req.files;
    // print files array
    console.log(filesArray)
    async.each(filesArray, (file, eachcallback) => {
        async.waterfall([
            (callback) => {
                fs.readFile(file.path, (err, data) => {
                    if (err) {
                        console.log("err occurred");
                    } else {
                        callback(null, data);
                    }
                })
            },
            (data, callback) => {
                // print file data, I believe this is where I would save to MongoDb
                console.log(data);
                var newDocument = new Document({
                    _id: mongoose.Types.ObjectId(),
                    name: file.originalname,
                    data: data,
                });
                // add document to patient
                Patient.findById(patientId)
                    .then(patient => {
                        var documents = patient.documents;
                        documents.push(newDocument._id);
                        patient.documents = documents;
                        patient.save();
                    });

                newDocument.save().then(doc => console.log(`Document(id=${doc._id}) saved to MedLock database.`));
                
                callback(null, 'success');
            }], (err, result) => {
                // result now equals 'done'
                // pass final callback to async each to move on to the next file
                eachcallback();
            });
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

// @route   GET api/patient/documents
// @desc    Retrieve all documents belonging to patient.
// @access  Private, requires an Auth0 Access Token
router.post('/delete', (req, res) => {
    console.log("POST request at api/patient/documents/delete");
    var id = req.user.sub.substring(6);
    var documentId = req.body.document_id;
    Patient.findById(id)
        .then(patient => {
            console.log("patient found");
            if (patient) {
                // delete document from MongoDb
                Document.findById(documentId)
                    .then(document => {
                        document.delete();
                    });
                // remove document from patient's list of documents
                var updatedDocs = [];
                var curDoc;
                // loop over patient's list of documents, take out document whose _id matches
                // the one sent in the post request for deletion
                console.log(`Patient Docs: ${patient.documents}`);
                console.log(typeof patient.documents[0]);
                documentId = mongoose.Types.ObjectId(documentId);

                for (var i in patient.documents) {
                    console.log(i);
                    curDoc = patient.documents[i];
                    if (String(curDoc._id) === documentId) {
                        updatedDocs.push(curDoc);
                    }
                }
                // update patient's list of documents
                console.log(updatedDocs);
                patient.documents = updatedDocs;
                // save patient
                patient.save();
                // send updated document list as response back to client
                console.log(patient.documents);
                res.send(patient.documents);             
            }
        })
        .catch(error => res.status(404).json(error));
});

// @route   POST api/patient/documents/delete
// @desc    Retrieve all documents belonging to patient.
// @access  Private, requires an Auth0 Access Token
router.get('/', (req, res) => {
    console.log("GET request at api/patient/documents");
    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => {
            console.log("patient found");
            if (patient) {
                // send patient's documents back to client
                var documents = [];
                if (patient.documents.length > 0) {
                    for (var i in patient.documents) {
                        console.log(i);
                        Document.findById(patient.documents[i]._id)
                            .then(doc => {
                                documents.push(doc);
                                if (i == patient.documents.length - 1) {
                                    res.json(documents);
                                }
                            });
                    }
                } else {
                    res.json([]);
                }
            }
        })
        .catch(error => res.status(404).json(error));
});

module.exports = router;