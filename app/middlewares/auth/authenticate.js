module.exports = function(req, res) {
	var provider = req._parsedUrl.pathname.replace(/(\/)/g, '');
	var config = require('../../config.json').OAuth2[provider];
	const oauth2 = require('simple-oauth2').create(config.init);
	const authorizationUri = oauth2.authorizationCode.authorizeURL(config.authorization);
	
	res.redirect(authorizationUri);
}