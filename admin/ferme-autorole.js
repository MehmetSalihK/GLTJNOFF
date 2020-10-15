const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  	let sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
    	let otorolkapat = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
		if(!sunucuyaözelayarlarOtorol[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Vous ne pouvez pas réinitialiser parce que vous n'avez pas défini l'autorole`)
				.setColor("RED")
				.setTimestamp(`Utilisation = \`${message.prefix}autorole @<rol>\`\``)
			message.channel.send({embed})
			return
		}
		delete sunucuyaözelayarlarOtorol[message.guild.id]
		fs.writeFile("./paramètres/autorole.json", JSON.stringify(sunucuyaözelayarlarOtorol), (err) => {
			console.log(err)
		})
		const embed = new Discord.RichEmbed()
			.setDescription(`Otorol Réinitialiser`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}


exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'otorolsıfırla', 
  description: 'Slots oyunu oynar',
  usage: 'otorolkapat'
};