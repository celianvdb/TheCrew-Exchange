const log = require('../../logger');
var express_ = require('express');
const Service = require('../service.js');

class express extends Service {
	constructor(name, config) {
		super(name, config);
		this.client = express_();
	}

	start() {
		return new Promise((resolve, reject) => {
			this.server = this.client.listen(this.config.port, () => {
				log.info(this.name + ' listening on port '+this.config.port+'!');
				this.status = true;
				resolve();
			})
		});
	}

	stop() {
		return new Promise((resolve, reject) => {
			this.server.close(() => {
				log.info(this.name + ' not longer listening on port '+this.config.port+'.')
				this.status = false;
				resolve();
			})
		});
	}
}
module.exports = express;