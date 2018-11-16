var config = require('../config.json');
var commandHandler = require('./commandsHandler');
var discord = require('../services').discord.client;

class DiscordMessageHandler {
	constructor() {
		discord.on('message', msg => {
			if(msg.content.toLowerCase().split(' ')[0] === config.discord.prefix)
				commandHandler(msg);
		})
	}
}

module.exports = new DiscordMessageHandler;