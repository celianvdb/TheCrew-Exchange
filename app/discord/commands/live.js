/*
Little tool to allow dev of LiveBot to recover it in case of crash
*/

var config = require('../../config.json');
const shell = require('shelljs');

module.exports = function(msg) {
	if(config.discord.live_admins.indexOf(msg.author.id)) {
		switch(msg.content.split(' ')[2]) {
			case 'wakeup':
				shell.exec('killall LiveBot3');
				break;
			case 'status':
				// To add after the LiveBot update.
				break;
			default:
				msg.reply('Unknow command, you can use : wakeup, status');
		}	
	} else {
		msg.reply('Only live bot admins can use this command.')
	}
}