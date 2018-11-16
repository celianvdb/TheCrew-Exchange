var mongoose = require('mongoose');
var Token = require('./token');
class TokensPair {

	async findPair(id) { // Put id of any token in entry to find the pair
		//Get pair
		var firstToken;

		await Token.findOne({ '_id' : id }).then((token) => {
			if(token) {
				if(token.type)
					this.refresh_token = token;
				else
					this.access_token = token;
				firstToken = token;
			}
		})

		//Then search the second token of the pair
		await Token.findOne({ 'pair_id' : firstToken.pair_id, 'type' : !firstToken.type }).then((token) => {
			if(token.type)
				this.refresh_token = token;
			else
				this.access_token = token;
		})

		return;
	}

	generate(user_id) {
		//Generate pair of tokens
	
		var pair_id = mongoose.Types.ObjectId();

		var access_token = new Token({
			'user_id' : user_id,
			'type' : false,
			'pair_id' : pair_id
		});

		var refresh_token = new Token({
			'user_id' : user_id,
			'type' : true,
			'pair_id' : pair_id
		});
		
		var output = Promise.all([refresh_token.save(), access_token.save()]);
		output.then((tokens) => {
			this.refresh_token = tokens[0];
			this.access_token = tokens[1];
		}).catch((err) => {
			console.log(err);
		});
		
		return output;
		
	}

	async disable() {
		if(this.access_token && this.refresh_token) {
			return Promise.all([this.access_token.disableToken(), this.refresh_token.disableToken()]);
		}
		return false;
	}
}

module.exports = TokensPair;