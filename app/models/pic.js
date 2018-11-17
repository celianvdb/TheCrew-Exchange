var mongoose = require('mongoose');
var fs = require('fs');
const config = require('../../config.json');

var Pic = new Schema({
	identifier : { type: String },
	user_id: { type: ObjectId },
	librarys : { type: Array },
	uploaded_date: { type: Date, default: Date.now },
	checksum : { type: String },
	filesize : { type: Number },
	showable : { type: Boolean, default: true }
});

Pic.methods.getFile = function() {
	var path = config.storage.pictures + this.identifier;
	this.file = fs.readFileSync(path);
};

module.exports = mongoose.model('Pic', Pic);