const mongoose = require('mongoose');
const DocumentSchema = require('./schemas/DocumentSchema');

module.exports = Document = mongoose.model('document', DocumentSchema);