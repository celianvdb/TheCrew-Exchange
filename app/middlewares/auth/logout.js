module.exports = async function (req, res) {
	var Token = require('../../models/token.js');
	var jwt = require('jsonwebtoken');
	var config = require('../../config.json');

	if(req.query.token) {
		var token = req.query.token;
		token = jwt.verify(token, config.token_secret);
		Token.findOne({ '_id' : token._id }).then(async function(token) {
			if(!token)
				res.errors(['Invalid token'])
			else {
				await token.disableToken();
				res.json({
					"status" : 'Success',
					"msg" : ["Token disabled!"]
				});
			}
		})
	}else {
		res.errors(['Please provide a token!'])
	}
}