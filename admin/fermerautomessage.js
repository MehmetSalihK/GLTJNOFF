 const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (bot, message, args) => {
  	let sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
  if (message.author.id !=428233517483425793)
		if(!sunucuyaözelayarlarOtorol[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription("Autoroll ne peut pas fermer!\n\À définir `-autoroll @roll`")
				.setColor("RED")
			message.channel.send({embed})
			return
		}
  exports.run = async (bot, message, args, member) => {
      	let enregistrement = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
		delete enregistrement[message.guild.id]
		fs.writeFile("./paramètres/autorole.json", JSON.stringify(enregistrement), (err) => {

		})
		const embed = new Discord.RichEmbed()
			.setDescription(`Messages Autoroll fermés avec succès`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}}