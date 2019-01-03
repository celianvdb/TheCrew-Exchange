const staff = require('../permissions/staff.js');

module.exports = function(msg) {
	
	if(msg.content.split(' ')[2] && !isNaN(msg.content.split(' ')[2]) && staff(msg)) {
		console.log('<@'+msg.author.id+'> is removing ' + msg.content.split(' ')[2] + ' éléments.');
		
		msg.channel.bulkDelete(Number(msg.content.split(' ')[2])+1) // Only for recents messages ( < 2 weeks )

		// This one is slower but works for old messages
		/*msg.channel.fetchMessages({ limit: Number(msg.content.split(' ')[2])+1 })
			.then(messages => (
				messages.array().forEach((message) => {
					console.log('deleting')
					message.delete().then(console.log('deleted'));
				})
			))
			.catch(console.error);*/
	}
}