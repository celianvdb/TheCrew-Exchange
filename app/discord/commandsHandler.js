var contests = require('./contests.js');

module.exports = function(msg) {
	console.log('Command handler : '+msg.content)
	switch(msg.content.split(' ')[1]) {
		case 'contest':
			contests(msg);
			break;
		case 'status':
			msg.reply("It looks like that I'm alive but for now I just reply when I got a message so It's maybe false ...")
			break;
		case 'help':
		default:
			msg.reply(" HELP : This is gonna be the help command with the list of commands you can do!", {reply: false})
			break;
	}

}