var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const config = require('../config.json');

var Contest = new Schema({
	name : { type: String },
	description : { type: String },
    created_on: { type: Date, default: Date.now },
    
});

module.exports = mongoose.model('Library', Library);