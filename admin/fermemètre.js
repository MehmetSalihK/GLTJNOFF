const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=428233517483425793)
   message.delete().catch(console.error);
    let mètre = JSON.parse(fs.readFileSync("./paramètres/mètre.json", "utf8"));
        if(!mètre[message.guild.id]) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Le compteur ne peut pas être réinitialisé car il n'est pas défini!`)
        .setFooter('Gilet Jaune vous souhaite un bon moment!', bot.user.avatarURL)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            return
        }
        delete mètre[message.guild.id]
        fs.writeFile("./paramètres/mètre.json", JSON.stringify(mètre), (err) => {
            console.log(err)
        })
        const embed = new Discord.RichEmbed()
            .setDescription(`Réinitialisation du compteur avec succès!`)
      .setFooter('Gilet Jaune vous souhaite un bon moment!', bot.user.avatarURL)
            .setColor("RANDOM")
            .setTimestamp()
        message.channel.send({embed})
        return
    }
   