const Discord = require('discord.js')
const fs = require('fs')
const tests = JSON.parse(fs.readFileSync("./paramètres/tst.json", "utf8"))
module.exports.run = async (bot, message, args) => {
  	let messageArray = message.content.split(" ");
        
    let filter = m => m.author.id === message.author.id;
    let LaDate;
  
    message.channel.send({embed: {
   color: 1127128,
  description: `📅 **| Maintenant, Maintenant, tapez la date... **\n exemple : \`Lundi 10 Avril\``
}}).then(msg => {

        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            LaDate = collected.first().content;
            let date = message.content.split(" ");
            if(!date) return msg.edit({embed: {
   color: 15158332,
  description: `<:Erreur:641323112687861777> **| Nom de chaîne incorrect (Tapez à nouveau la commande).**`
}}) && console.log('<:Erreur:641323112687861777> | je trouve pas cette chaîne.')
            let LHeure;
            msg.edit({embed: {
   color: 1127128,
  description: `<a:horloge:693300842521952406> **| Veuillez saisir l'heure et minute.... **\n exemple : \`15:00\``
}}).then(msg => {
      
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {
                    collected.first().delete();
                    LHeure = collected.first().content;
                    let heure = message.content.split(" ");
                    if(!heure) return msg.edit({embed: {
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
                      .setTitle('**Terminé**')
                      .addField('Date', `${LaDate}`)
                      .addField("L'heure:", `${LHeure}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${bot.user.username} | pour fermer captcha [${message.prefix}fermecaptcha]`)
                     message.channel.sendEmbed(embed)
    tests[message.guild.id] = {
        LaDate: LaDate,
        LHeure: LHeure
    }
    fs.writeFile("./paramètres/tst.json", JSON.stringify(tests), (err) => {
    if (err) console.error(err)
  })
   } 
            )
        })
    })
})
    })
}   