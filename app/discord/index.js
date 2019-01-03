var config = require('../config.json');
var commandHandler = require('./commandsHandler');
var discord = require('../services').discord.client;
const Embed = require('discord.js').RichEmbed;

String.template = require('template-strings');

class DiscordMainHandler {
	constructor() {

		var fs = require('fs');
		
		discord.on('message', msg => {

			if(msg.content.toLowerCase().split(' ')[0] === config.discord.prefix)
				commandHandler(msg);

			//Pictures channel
			if(msg.channel.id == config.discord.channels.pictures) {
				if(msg.attachments.array().length > 0) {
					var embed = new Embed();
					msg.attachments.array().forEach((pics) => {
						embed.setAuthor(pics.message.author.username, pics.message.author.avatarURL, pics.message.author.url).setImage(pics.url).setColor('RANDOM').setDescription(pics.message.content);
					})
					msg.channel.send(embed)
				}
				console.log(msg)
			}

			//Videos channel
			if(msg.channel.id == config.discord.channels.videos) {
				if(msg.embeds.length > 0 && msg.embeds[0].video) { // If a video is in embedded in the message

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

module.exports = new DiscordMainHandler;