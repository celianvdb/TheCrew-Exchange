var Token = require('../../models/token');
module.exports = async function(req, res, next) {
	if(!req.query.accces_token)
		return res.errors(['No token provided.']);

	var token = req.query.accces_token;
	
	token = await Token.getTokenFromJWT(token);
	if(!token) {
		return res.errors(['An error occured.']);
	}

	if(token.type)
		return res.errors(['Please use your access token.']);

	switch(token.tokenStatus()){
		case 0:
			res.errors(['Invalid or disabled token.']);
			break;
		case 1:
			next(); 
			break;
		case 2:
			res.errors(['Expired token.']);
			break;
		default:
			res.errors(['An error occured.']);
	}
}