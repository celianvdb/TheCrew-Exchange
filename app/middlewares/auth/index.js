const oauth2 = require('simple-oauth2');
const User = require('../../models/user.js');
var request = require('request-promise-native');
var config = require('../../config.json');
var jwt = require('jsonwebtoken');
var client;
var service; 

class Auth {

	constructor(service_name){
		config = config.OAuth2[service_name];
		client = oauth2.create(config.init);
		service = service_name;
	}
 
	authenticate(req, res) {
		const authorizationUri = client.authorizationCode.authorizeURL(config.authorization);
		res.redirect(authorizationUri);
	}

	async authenticate_callback(req, res) {
		const code = req.query.code;
		var tokenConfig;

		if(service === 'twitch') { 
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
			var token = await client.authorizationCode.getToken(tokenConfig);			

			//Get user_id from OAuth service
			request({
				url: config.user,
				headers: {
					'Authorization': 'OAuth '+token.access_token
				}
			}).then((user)=> {
				const service_id = service+'_id';
				var id;

				if(service == 'twitch') {
					const id = user.user_id;
				}

				User.findOne({ service_id: id }).then(function(user) {
					if(!user) { //If user need to be created
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
				console.log(err)
				res.errors(['Login failed!']);
			})

		} catch(err) {
			console.log(err)
			res.errors(['Login failed!']);
		}
	}

}

module.exports = Auth;