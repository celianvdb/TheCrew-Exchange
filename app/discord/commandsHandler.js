var contests = require('./commands/contests.js');
var purge = require('./commands/purge.js');
var live = require('./commands/purge.js');
var summit = require('./commands/summit.js');

module.exports = function(msg) {
	console.log('Command handler : '+msg.content)
	switch(msg.content.split(' ')[1]) {
		case 'contest':
			contests(msg);
			break;
		case 'status':
			msg.reply("It looks like that I'm alive but for now I just reply when I got a message so It's maybe false ...")
			break;
		case 'purge':
			purge(msg);
			break;
		case 'live':
			live(msg);
			break;
		case 'summit':
			summit(msg);
			break;
		case 'help':
		default:
			msg.reply(" HELP : This is gonna be the help command with the list of commands you can do!", {reply: false})
			break;
	}

}