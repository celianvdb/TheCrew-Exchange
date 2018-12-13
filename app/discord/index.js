var config = require('../config.json');
var commandHandler = require('./commandsHandler');
var discord = require('../services').discord.client;
String.template = require('template-strings');

class DiscordMessageHandler {
	constructor() {
		discord.on('message', msg => {

			console.log(config.discord.channels.videos);

			if(msg.content.toLowerCase().split(' ')[0] === config.discord.prefix)
				commandHandler(msg);
			
			if(msg.channel.id == config.discord.channels.videos) {
				if(msg.embeds.length > 0 && msg.embeds[0].video) { // If a video is in embedded in the message
					console.log(msg.embeds[0].video.url)
				}
			}

		})
		discord.on('guildMemberAdd', guildMember => { // Welcome messages
			config.discord.channels.welcome_messages.forEach(welcome => {
				if(guildMember.guild.id == welcome.guild) {
					discord.channels.get(welcome.channel).send(String.template(welcome.message, {"user_id" : guildMember.id}));
				}
			});
		})
	}
}

module.exports = new DiscordMessageHandler;