/* REMOVE SOON
const passport = require('passport');
const User = require('./models/user.js');
const OAuth2Strategy = require('passport-oauth2');
var config = require('./config.json');
config = config[config.env];

var TwitchUser = new OAuth2Strategy({
	authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
	tokenURL: 'https://id.twitch.tv/oauth2/token',
	clientID: config.OAuth2.twitch.clientId,
	clientSecret: config.OAuth2.twitch.clientSecret,
	callbackURL: config.domain+'auth/twitch/callback'},
	function(accessToken, refreshToken, params, profile, cb) {
		this.profile(accessToken, (err, data) => {
			console.log(data, err);
		})
		console.log(accessToken)
		console.log(params)
		console.log(profile)
		User.findOrCreate({ twitch_id: profile.id }, function (err, user) {
			return cb(err, user);
		});
	}
)

TwitchUser.profile = function (accesstoken, done) {
	this._oauth2._request("GET", "https://id.twitch.tv/oauth2/validate", null, null, accesstoken, (err, data) => {
		if (err) { return done(err); }
		try {
			data = JSON.parse( data );
		}
		catch(e) {
			return done(e);
		}
		done(null, data);
	});
}

passport.use('Twitch', TwitchUser)

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

module.exports = passport; */