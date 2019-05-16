var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const config = require('../config.json');

var Prosetting = new Schema({
	name : { type: String },
	author : { type: Schema.Types.ObjectId, ref: 'User' },
	event : { type: Schema.Types.ObjectId, ref: 'Event' },
	weather : { type: String, enum: ['dry', 'wet', 'snow']},
	vehicle : { type: Schema.Types.ObjectId, ref: 'vehicle' },
	aero_distrib : { type: Number, min: 0, max: 10 },
	gearbox : { type: Number, min: 0, max: 10 },
	tire_grap_front : { type: Number, min: 0, max: 10 },
	tire_grap_rear : { type: Number, min: 0, max: 10 },
	brake_power : { type: Number, min: 0, max: 10 },
	brake_balance : { type: Number, min: 0, max: 10 },
	susp_comp_front : { type: Number, min: 0, max: 10 },
	susp_reb_front : { type: Number, min: 0, max: 10 },
	susp_comp_rear : { type: Number, min: 0, max: 10 },
	susp_reb_rear : { type: Number, min: 0, max: 10 },
	susp_geom_camber_front : { type: Number, min: 0, max: 10 },
	susp_geom_camber_rear : { type: Number, min: 0, max: 10 },
	arb_front : { type: Number, min: 0, max: 10 },
	arb_rear : { type: Number, min: 0, max: 10 }
});

module.exports = mongoose.model('Prosetting', Prosetting);