var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const config = require('../config.json');

var Discipline = new Schema({
	name : { type: String },
	family : { type: Schema.Types.ObjectId, ref: 'Family' }
});

module.exports = mongoose.model('Discipline', Discipline);