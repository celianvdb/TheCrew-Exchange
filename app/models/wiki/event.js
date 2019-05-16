var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const config = require('../config.json');

var Event = new Schema({
	name : { type: String },
	discipline : { type: Schema.Types.ObjectId, ref: 'Discipline' }
});

module.exports = mongoose.model('Event', Event);