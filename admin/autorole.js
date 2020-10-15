const fs = require ('fs')
const Discord = require('discord.js')
var sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));


exports.run = async (bot, message, args) =>
{
  if (message.author.id !=428233517483425793)
if(!message.member.hasPermission("MANAGE_MESSAGES")) return  message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  	let profil = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
  if (! args[0] ) return message.channel.send({embed: {
   color: 1127128,
   description: `Vous devriez avoir une étiquette de rôle. \nSi c'est impossible de nommer le rôle **Il faut surtout d'activer l'option d'étiquetage** \nExemple d'utilisation : \`${message.prefix}autorole @role\``
}})
  if (message.guild.member(message.author.id).hasPermission(0x8))
    
    {
      var mentionedRole = message.mentions.roles.first();
      if (!mentionedRole) return message.channel.send({embed: {
   color: 1127128,
   description: `**Utilisation correcte = \`${message.prefix}autorole @<rol>\`**`}})
      

	if(!profil[message.guild.id]){
    
		profil[message.guild.id] = {
      
			sayi: mentionedRole.id
		};
	}
	
	profil[message.guild.id].sayi = mentionedRole.id
	
	fs.writeFile("./paramètres/autorole.json", JSON.stringify(profil), (err) => {
		console.log(err)

	})
      
      var olcum = await message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:loading:641302549726494740> Sélection du AutoRole, Restez en attente...`)
      .setColor("GREEN")).then(msg => msg.delete(3000));
            var sonuc = await message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:Valider:641302704181870592> AutoRole à été sélectionnée!`)
      .setColor("GREEN")).then(msg => msg.delete(2000));

	const embed = new Discord.RichEmbed()
    .addField(':inbox_tray: AutoRole', `**${args[0]}**`, true)
		.setColor("#00FF00")
  .setFooter(`Pour de l'aide [${message.prefix}aide]`, bot.user.avatarURL);
	message.channel.send({embed})
}

}



exports.conf =
{
  enabled: true,
  guildOnly: true,
  aliases: ["setautorole", "otorol", "otoroldeğiştir"]
}

exports.help =
{
  name: 'otorol',
  description: 'Sunucuya Girenlere Verilecek Olan Otorolü Ayarlar.',
  usage: 'otorolayarla'
}