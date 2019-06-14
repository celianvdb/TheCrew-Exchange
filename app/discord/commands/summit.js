const Discord = require('discord.js');

//test data
var summit_data = {"points":0,"rank":0,"total_players":22143,"activities":[],"tier_entries":[{"points":4294967295,"rank":4294967295},{"points":365712,"rank":15000},{"points":785573,"rank":8000},{"points":1156622,"rank":3000}]};

module.exports = function(msg) {
	if(msg.content.split(' ')[2] == "info") {
		console.log('here')
		var embed = new Discord.RichEmbed({
			'description' : 'Last summit:',
			'fields' : [
				{
					"name" : "Total players",
					"value" : summit_data.total_players
				}
			]
		});
		summit_data.tier_entries.forEach((tier) => {
			embed.addField(tier.rank, tier.points)
		});
		msg.reply(embed)
	}
}

//https://api.thecrew-hub.com/v1/summit/1559102400/score/pc/profile/a92d844e-9c57-4b8c-a249-108ef42d4500