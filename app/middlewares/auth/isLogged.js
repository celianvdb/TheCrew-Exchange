var Token = require('../../models/token');
module.exports = async function(req, res, next) {
	if(!req.query.accces_token)
		return res.errors(['No token provided.']);

<<<<<<< HEAD
	var token = req.query.accces_token;
	
=======
	var token = req.query.token;

	//Decode the token
>>>>>>> 7d3d4ee83a392bceca9cb00d0759a9d206c6879b
	token = await Token.getTokenFromJWT(token);
	if(!token) {
		return res.errors(['An error occured.']);
	}

	//Check if the user still have an auth provider linked to his account
	

	//Check if it's an access token
	if(token.type)
		return res.errors(['Please use your access token.']);

	//Check the status of the token
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