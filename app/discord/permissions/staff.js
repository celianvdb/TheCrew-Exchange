var config = require('../../config.json');

module.exports = function(msg) {
	return msg.guild.roles.find('id', config.discord.staff_id).members.find('id', msg.author.id);
}