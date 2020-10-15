 const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return  message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=473987297529036801)
   message.delete().catch(console.error);
  	let sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
		if(!sunucuyaözelayarlarOtorol[message.guild.id]) {
			const embed = new Discord.RichEmbed()
				.setDescription(`Otorolü Ayarlamadığın İçin Kapatamazsın!`)
				.setColor("RED")
				.setTimestamp(`Ayarlamak İçin \`${message.prefix}otorol @roladi\``)
			message.channel.send({embed})
			return
		}
  exports.run = async (bot, message, args, member) => {
      	let enregistrement = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
		delete enregistrement[message.guild.id]
		fs.writeFile("./autorole.json", JSON.stringify(enregistrement), (err) => {

		})
		const embed = new Discord.RichEmbed()
			.setDescription(`Otorol Mesajları Başarıyla Kapatıldı`)
			.setColor("RANDOM")
			.setTimestamp()
		message.channel.send({embed})
		return
	}}