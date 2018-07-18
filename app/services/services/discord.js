const log = require('../../logger');
const Service = require('../service.js');
const Discord = require('discord.js');

class discord extends Service {
	constructor(name, config) {
		super(name, config);
		this.client = new Discord.Client();
		this.client.on('disconnect', () => {
			log.info('Discord : Disconnected');
		});

	}

	start() {
		return this.client.login(this.config.token).then(() => {
			log.info('Discord : Connected');
		});
	}

	stop() {
		this.client.destroy();
	}
}
module.exports = discord;