module.exports = async function(req, res) {
	const provider = req._parsedUrl.pathname.split('/')[1].replace(/(\/)/g, '');
	const config = require('../../config.json').OAuth2[provider];
	
	const oauth2 = require('simple-oauth2').create(config.init);;
	const User = require('../../models/user.js');
	const request = require('request-promise-native');

	const log = require('../../logger.js');

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
		token = oauth2.accessToken.create(token).token;	
		
		//Get user_id from OAuth provider
		request({
			url: config.user,
			headers: {
				'Authorization': 'OAuth '+token.access_token
			},
			json : true
		}).then((remoteUser)=> {
			const service_id = provider+'_id';
			var id = '';
			var username = '';

			if(provider === 'twitch') {
				id = remoteUser.user_id;
				username = remoteUser.login;
			}

			User.findOne({ twitch_id : id }).then(async function(user) {
				if(!user) { //If user need to be created
					console.log('Creating account...')
					var data = {};
					data[service_id] = id;
					data['username'] = username;

					user = new User(data);
					await user.save();
					
				}
				var token = await user.createToken();

				res.json({
					"status" : 'Success',
					"token" : token.getToken()
				});

			}).catch((err)=>{
				console.log(err);
				log.error('Error while creating user in auth_callback: ' + err)
				res.errors([err]); // TO REMOVE, DEBUG
			});

		}).catch((err)=>{
			res.errors([err]); // TO REMOVE, DEBUG
		})

	} catch(err) {
		res.errors(['Login failed!']);
	}
}