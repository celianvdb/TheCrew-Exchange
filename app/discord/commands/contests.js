module.exports = function(msg) {
	if(msg.content.split(' ')[2] == "list") {
		msg.reply('Here is the list of actives contests : {LIST}');
	}
}