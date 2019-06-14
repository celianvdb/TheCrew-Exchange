var config = require('../../config.json');

module.exports = function(msg) {
	
	if(msg.content.split(' ')[2] && !isNaN(msg.content.split(' ')[2]) && msg.guild.id == config.discord.tce_guild) { //Only usable on TCE discord
        
	}
}