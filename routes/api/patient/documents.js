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

console.log('Reached api/patient/document endpoint');

// @route   POST api/patient/documents/upload
// @desc    Upload new document to patient profile
// @access  Private, requires an Auth0 Access Token
router.post('/upload', multerupload.any(), (req, res) => {
    console.log("POST request to api/patient/document/upload");
    var patientId = req.user.sub.substring(6);
    var filesArray = req.files;
    // print files array
    console.log(filesArray);
    var documentIds = [];
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
                // create new document
                var newDocument = new Document({
                    _id: mongoose.Types.ObjectId(),
                    name: file.originalname,
                    data: data,
                });

                // add _id to documentIds
                documentIds.push(newDocument._id);

                // save new document
                newDocument.save().then(doc => {
                    console.log(`Document(id=${doc._id}) saved to MedLock database.`);     
                    callback(null, 'success');               
                });

                // add document to patient
                // Patient.findById(patientId)
                //     .then(patient => {
                //         var documents = patient.documents;
                //         documents.push(newDocument._id);
                //         patient.documents = documents;
                //         patient.save().then(patient => {
                //             console.log(`Patient(id=${patient._id}) added Document(id=${newDocument._id}) to their list of documents.`);
                //             callback(null, 'success');
                //         });
                //     });
            }], (err, result) => {
                // result now equals 'done'
                // pass final callback to async each to move on to the next file
                eachcallback();
            });
        // do something for each file
    }, (error) => {
        if (error) {
            console.log('error has occurred in each', error);
            res.status(500).json(error);
        } else {
            console.log('finished processing');
            Patient.findById(patientId).then(patient => {
                for (var i in documentIds) {
                    patient.documents.push(documentIds[i]);
                }
                patient.save().then(patient => {
                    console.log(`Patient(id=${patient._id}) added Documents(ids=[${documentIds}]) to their list of documents.`);
                    Document.find({
                        "_id": {
                            "$in": patient.documents
                        }
                    })
                    .then(doc => {
                        res.json(doc)
                    })
                    .catch(err => console.log(err)); 
                });

            });
        }
    });
});

// @route   GET api/patient/documents
// @desc    Retrieve all documents belonging to patient.
// @access  Private, requires an Auth0 Access Token
router.post('/delete', (req, res) => {
    console.log("POST request at api/patient/document/delete");
    var id = req.user.sub.substring(6);
    var documentId = req.body.documentId;
    Patient.findById(id)
        .then(patient => {
            console.log("patient found");
            console.log(documentId);
            if (patient) {
                // delete document from MongoDb
                Document.findById(documentId)
                    .then(document => {
                        console.log(document);
                        document.remove();
                    });
                // remove document from patient's list of documents
                const newDocumentList = patient.documents.filter(doc => String(doc._id) != documentId);
                console.log(newDocumentList);
                patient.documents = newDocumentList;

                // save patient
                patient.save().then(patient => console.log(`Patient(id=${patient._id}) removed Document(id=${documentId}) from list of documents`));
                Document.find({
                    "_id": {
                        "$in": newDocumentList
                    }
                })
                .then(doc => res.json(doc))
                .catch(err => console.log(err));            
            }
        })
        .catch(error => res.status(404).json(error));
});

// @route   POST api/patient/documents/delete
// @desc    Retrieve all documents belonging to patient.
// @access  Private, requires an Auth0 Access Token
router.get('/', (req, res) => {
    console.log("GET request at api/patient/document");
    var id = req.user.sub.substring(6);
    Patient.findById(id)
        .then(patient => {
            console.log("patient found");
            if (patient) {
                // send patient's documents back to client
                const documentIds = patient.documents.map(doc => mongoose.Types.ObjectId(doc._id));
                Document.find({
                    "_id": {
                        "$in": documentIds
                    }
                })
                .then(doc => res.json(doc))
                .catch(err => console.log(err));
            }
        })
        .catch(error => res.status(404).json(error));
});

module.exports = router;