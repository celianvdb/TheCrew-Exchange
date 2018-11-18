var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const config = require('../config.json');
var fs = require('fs');

var Pic = new Schema({
	identifier : { type: String },
	user_id: { type: ObjectId },
	libraries : { type: Array },
	uploaded_date: { type: Date, default: Date.now },
	checksum : { type: String }, //md5 Checksum of the original file only
	filesize : { type: Number }, //Filesize of the original file only (Bytes)
	showable : { type: Boolean, default: true }
});

Pic.methods.getFile = function() {
	var path = config.storage.pictures + this.identifier;
	this.file = fs.readFileSync(path);
};

Pic.statics.createIdentifier = async function() {
	function genIdentifier() {
		
		$characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$string = '';
		
		for ($i = 0; $i < 8; $i++) {
				$string += $characters[Math.floor((Math.random() * $characters.length) + 0)];
		}
		return $string;

	}

	var identifier = genIdentifier();

	while(await this.findOne({ 'identifier' : identifier })) {
		identifier = genIdentifier(); 
	}

	return identifier;
}

module.exports = mongoose.model('Pic', Pic);