var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const config = require('../config.json');

var Vehicle = new Schema({
	name : { type: String },
	brand : { type: Schema.Types.ObjectId, ref: 'Brand' },
	discipline : { type: Schema.Types.ObjectId, ref: 'Discipline' },
	year: { type: Number },
	price : { type: Number }
});

module.exports = mongoose.model('Vehicle', Vehicle);