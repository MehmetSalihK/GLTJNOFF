const Discord = require('discord.js')
const fs = require('fs')
const verifyj = JSON.parse(fs.readFileSync("./paramètres/verify.json", "utf8"))
exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}}).then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
  if (message.author.id !=428233517483425793)
   message.delete().catch(console.error);
  	let messageArray = message.content.split(" ");
        
    let filter = m => m.author.id === message.author.id;
    let ch;
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}}).then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}}).then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
    message.channel.send({embed: {
   color: 1127128,
  description: `:pencil: **| Maintenant, tapez le nom du canal de vérification... :pencil2: **\n exemple : \`verify\` et non \`#verify\``
}}).then(msg => {

        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            ch = collected.first().content;
            let chf = message.guild.channels.find('name', `${ch}`)
            if(!chf) return msg.edit({embed: {
   color: 15158332,
  description: `<:Erreur:641323112687861777> **| Nom de chaîne incorrect (Tapez à nouveau la commande).**`
}}) && console.log('<:Erreur:641323112687861777> | je trouve pas cette chaîne.')
            let rr;
            msg.edit({embed: {
   color: 1127128,
  description: `:scroll: **| Veuillez saisir le nom de rôle vérifié.... :pencil2: **\n exemple : \`nouveau\` et non \`@nouveau\``
}}).then(msg => {
      
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {
                    collected.first().delete();
                    rr = collected.first().content;
                    let rf = message.guild.roles.find('name', `${rr}`)
                    if(!rf) return msg.edit({embed: {
   color: 15158332,
  description: `<:Erreur:641323112687861777> **| Nom de rôle incorrect (Tapez à nouveau la commande)**`
}}) && console.log('<:Erreur:641323112687861777> | je trouve pas ce rôle')
                    msg.edit({embed: {
   color: 1127128,
  description: `<a:valid:641302704181870592> **| Fait avec succès.**`
}}).then(msg => {
        
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ['time']
                      })
                      let embed = new Discord.RichEmbed()
                      .setTitle('**Terminé Le Captcha a été installé**')
                      .addField('Captcha Channel:', `${ch}`)
                      .addField('Rôle vérifié:', `${rr}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${bot.user.username} | pour fermer captcha [${message.prefix}fermecaptcha]`)
                     message.channel.sendEmbed(embed)
    verifyj[message.guild.id] = {
        channel: ch,
        rolev: rr,
        onoff: 'On'
    }
    fs.writeFile("./paramètres/verify.json", JSON.stringify(verifyj), (err) => {
    if (err) console.error(err)
  })
   } 
            )
        })
    })
})
    })
}   