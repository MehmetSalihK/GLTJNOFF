const fs = require ('fs')
const Discord = require('discord.js')


exports.run = async (bot, message, args) =>{
  message.delete()
         if (message.member.hasPermission("ADMINISTRATOR")) {
            const color = args[0]
                 
            const text = args.slice(1).join(" ");
            if (text.length < 1) return message.channel.send("Ne peut rien annoncer");
            //const colour = args.slice(2).join("");
            const embed = new Discord.RichEmbed()
            .setColor("0x" + color)
            .setTitle("Annonce importante:")
            .setDescription(text);
            message.channel.send("@everyone")
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