var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const config = require('../config.json');

var Family = new Schema({
	name : { type: String }
});

module.exports = mongoose.model('Family', Family);