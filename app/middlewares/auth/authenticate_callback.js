module.exports = async function(req, res) {
	const provider = req._parsedUrl.pathname.split('/')[1].replace(/(\/)/g, '');
	const config = require('../../config.json').OAuth2[provider];
	
	const oauth2 = require('simple-oauth2').create(config.init);;
	const User = require('../../models/user.js');
	const request = require('request-promise-native');
	const jwt = require('jsonwebtoken');

	const code = req.query.code;
	var tokenConfig;

	if(provider === 'twitch') { 
		tokenConfig = {
			code,
			"redirect_uri" : config.authorization.redirect_uri,
			"client_id" : config.init.client.id,
			"client_secret" : config.init.client.secret,
			"grant_type" : "authorization_code"	
		}
	}

	//Get the token from the code

	try {
		var token = await oauth2.authorizationCode.getToken(tokenConfig);		
		token = oauth2.accessToken.create(token);	
		console.log(token)
		setTimeout(function(){ console.log(token); }, 3000);
		//Get user_id from OAuth provider
		request({
			url: config.user,
			headers: {
				'Authorization': 'OAuth '+token.access_token
			}
		}).then((user)=> {
			const service_id = provider+'_id';
			var id;

			if(provider == 'twitch') {
				const id = user.user_id;
			}

			User.findOne({ service_id: id }).then(function(user) {
				if(!user) { //If user need to be created
					/* WIP */
					var new_user = new User({
						'username' : user.login
					})
				}else {
					//User exist
				}
			}).catch(()=>{
				res.errors(['Login failed!']);
			});

		}).catch((err)=>{
			res.errors(['Login failed!']);
		})

	} catch(err) {
		res.errors(['Login failed!']);
	}
}