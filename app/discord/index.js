var config = require('../config.json');
var commandHandler = require('./commandsHandler');
var discord = require('../services').discord.client;
const Embed = require('discord.js').RichEmbed;
const shell = require('shelljs');

String.template = require('template-strings');

class DiscordMainHandler {
	constructor() {
		
		var live_bot_alive;

		discord.on('message', msg => {
			if(msg.author == config.discord.live_bot_id)
				live_bot_alive = true;

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

		//Restart live_bot if not responding to ping after 10sec
		/*
		setInterval(() => {
			discord.guilds.find('id', config.discord.tc_community_guild).members.find('id', live_bot_id).createDM().then((DMChannel) => {
				DMChannel.sendMessage('/ping');
				live_bot_alive = Date();
				setTimeout(() => {
					if(live_bot_alive != True)
						shell.exec('killall LiveBot3');
				}, 10000);
			})
		}, 180000)*/

		discord.on('ready', () => {
			discord.guilds.find('id', config.discord.tc_community_guild).members.find('id', '85017957343694848').createDM().then((DMChannel) => {
				DMChannel.sendMessage('HEYSALUT!!!').then((msg) => {
					console.log(msg);
				}).catch((err) => {
					console.log(err);
				});
			});
		})
	}
}

module.exports = new DiscordMainHandler;