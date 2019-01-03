module.exports = function(msg) {
	if(msg.content.split(' ')[2]) {
		console.log('Contest name : ' + msg.content.split(' ')[2]);
	}
}