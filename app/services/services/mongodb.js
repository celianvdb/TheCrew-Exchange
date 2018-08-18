const log = require('../../logger');
const Service = require('../service.js');
const User = require('../../models/user.js');

class MongoDB extends Service {

	constructor(name, config) {
		super(name, config);
		this.client = require('mongoose');
		this.client.Promise = global.Promise;
	}

	start() {
		return new Promise((resolve, reject) => {
			this.client.connect(this.config.url)
				.then(() => {
					log.info(this.name + ' connected!');
					resolve('Connected');
				})
				.catch(err => {
					console.log('rejected promise: '+err);
					reject(err);
				});
		});
	}

	stop() {
		return new Promise((resolve) => {
			this.client.disconnect()
				.then(() => {
					console.log(this.name + ' disconnected. ');
					resolve();
				});
		});
		
	}

	get status() {
		return this.client.connection.readyState;
	}

}
module.exports = MongoDB;