var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var Vehicle = new Schema({
	model : { type: String },
	brand : { type: Schema.Types.ObjectId, ref: 'Brand' },
	discipline : { type: Schema.Types.ObjectId, ref: 'Discipline' },
	year: { type: Number },
	price : { type: Number },
	type : { type: String, enum: ['car', 'boat', 'bike', 'plane', 'hovercraft']},
});

module.exports = mongoose.model('Vehicle', Vehicle);