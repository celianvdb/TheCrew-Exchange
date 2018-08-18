module.exports = async function (req, res) {
	var Token = require('../../models/token.js');
	var TokensPair = require('../../models/tokensPair.js');
	var jwt = require('jsonwebtoken');
	var config = require('../../config.json');

	if(req.query.token) {
		
		var token = req.query.token;
		token = jwt.verify(token, config.token_secret);
		
		var tokensPair = new TokensPair();
		await tokensPair.findPair(token._id);
		
		tokensPair.disable().then(() => {
			res.json({
				"status" : 'Success',
				"msg" : ["Token disabled!"]
			});
		}).catch(() => {
			res.errors(['Logout failed!']);
		})
		
	}else {
		res.errors(['Please provide a token.'])
	}
}