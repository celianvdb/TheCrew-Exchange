const axios = require('axios');

class Summit {

	constructor(title, raw_data) {
		this.id = raw_data.summit_id;
		this.title = title;
		this.scores = {'ps4' : [], 'pc' : [], 'x1' : []};
	}

	players_data_update() {
		//Download data of peoples that are sub to the following system
		// ADD PARAMS FROM DB BEFORE RUN IT CELIANNNN !!!
		axios.get('https://api.thecrew-hub.com/v1/summit/'+this.id+'/leaderboard/pc')
		.then(res => {
			res.body.entries.forEach((score) => {
				this.scores.pc.push({uplay_id : score.profile_id, rank : score.rank });
			});
		})
		.catch(err => {
			console.log('TCHUB : Error during update of players data.');
		});
		
		axios.get('https://api.thecrew-hub.com/v1/summit/'+this.id+'/leaderboard/x1')
		.then(res => {
			res.body.entries.forEach((score) => {
				this.scores.x1.push({uplay_id : score.profile_id, rank : score.rank });
			});
		})
		.catch(err => {
			console.log('TCHUB : Error during update of players data.');
		});
		
		axios.get('https://api.thecrew-hub.com/v1/summit/'+this.id+'/leaderboard/ps4')
		.then(res => {
			res.body.entries.forEach((score) => {
				this.scores.ps4.push({uplay_id : score.profile_id, rank : score.rank });
			});
		})
		.catch(err => {
			console.log('TCHUB : Error during update of players data.');
		});
	}

};

module.exports = Summit;