const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=428233517483425793)
   message.delete().catch(console.error);
  if (!message.member.hasPermission('ADMINISTRATOR'));
  	let sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
    	let otorolkapat = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
		if(!sunucuyaözelayarlarOtorol[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription("Vous ne pouvez pas réinitialiser l'AutoRole!\n\À définir `-autorole @role`")
				.setColor("RED")
			message.channel.send({embed})
			return
		}
		delete sunucuyaözelayarlarOtorol[message.guild.id]
		fs.writeFile("./paramètres/autorole.json", JSON.stringify(sunucuyaözelayarlarOtorol), (err) => {
			console.log(err)
		})
		const embed = new Discord.RichEmbed()
			.setDescription(`<a:attention:641302704181870592> | AutoRole Réinitialiser`)
			.setColor("#00FF00")
			.setTimestamp()
		message.channel.send({embed})
		return
	}