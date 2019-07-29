const axios = require('axios');
const Summit = require('./summit.js')

class TCHUB {

	constructor() {
		//this.update();
	}

	lang_update() {
		return axios.get('https://api.thecrew-hub.com/v1/data/locas/en.json')
		.then(res => {
			this.lang = res.data;
		})
		.catch(err => {
			console.log('TCHUB : Error during update of the language file')
		});
	}

	summits_update() {
		return new Promise(async (resolve, reject) => {
			//Update language file to be sure that everything match

			await this.lang_update();
			//console.log(this.lang)
			//Update score and every 

			var summits = [];

			axios.get('https://api.thecrew-hub.com/v1/data/summit')
			.then(res => {
				res.data.forEach(summit => {
					summits.push(new Summit(this.lang[summit.text_id], summit));
				});

				this.summits = summits;
				resolve(this.summits);
			})
			.catch(err => {
				console.log(err);
				reject();
			});
		});
	}


};

module.exports = new TCHUB();