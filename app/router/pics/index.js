const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const router = require('express-promise-router')();
const config = require('../../config.json');
const fs = require('fs');
const Pic = require('../../models/pic.js');
const Library = require('../../models/library.js');

router.use(fileUpload());
router.use(bodyParser.json());

router.post('/upload', /*isLogged, */async (req , res, next) => { //isLogged ByPass temporary for dev reasons
	if(req.files && req.body.librarys) { // files an librarys are var required
		
		if(req.files.picture) { // Image process
			if(req.files.picture.mimetype == 'image/jpeg' || req.files.picture.mimetype == 'image/png') {
				
				/*TODO
					Check if librarys exist
					Check size of pic
					Check for stupid ratio ?
				*/
				var identifier = await Pic.createIdentifier();
	
				var folder = config.storage.pictures + identifier;
				if (!fs.existsSync(folder)) {
					fs.mkdirSync(folder);
				}
	
				fs.writeFileSync(folder + '/' + identifier, req.files.picture.data);
				var pic = new Pic({filesize : req.files.picture.data.length, 'identifier' : identifier , 'checksum' : req.files.picture.md5()}).save();
				console.log(folder + '/' + identifier, identifier)
			} else {
				res.errors(['Unallowed file type, need to be png or jpeg.']);
			}
		}else if(req.files.video) { // Video process 
			// Soon™
			res.errors(['This feature is not ready for now.']);
		}else {
			res.errors(['No picture or video sent.']);
		}

	}
});

router.get('/test', (req, res, next) => {
	var test = new Library({'name':'gallery', 'description':'Main TCE\'s gallery'}).save()
});

module.exports = router;