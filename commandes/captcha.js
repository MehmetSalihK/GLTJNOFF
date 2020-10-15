const Discord = require('discord.js')
const fs = require('fs')
const verifyj = JSON.parse(fs.readFileSync("./paramètres/verify.json", "utf8"))
exports.run = async (bot, message, args) => {
   message.delete().catch(console.error);
if(message.author.bot) return;
    if(!message.channel.type === 'dm') return;
let rf = message.guild.roles.find('name', `${verifyj[message.guild.id].rolev}`)
 let mem = message.guild.member(message.author)
        if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
            channel: "Undefined",
            onoff: "Off",
            rolev: "Undefined"
        }
        if(verifyj[message.guild.id].onoff === "Off") return console.log('commande fermée')
    if(message.channel.name !== verifyj[message.guild.id].channel) return console.log('mauvais canal')
      if(mem.roles.has(rf.id)) return message.channel.send(':x: | Déjà vérifié !');
  const type = require('../paramètres/verifycodes.json');
  const item = type[Math.floor(Math.random() * type.length)];
  const filter = response => {
    message.delete().catch(console.error);
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase())
    message.delete().catch(console.error);
  }
    const embed = new Discord.RichEmbed()
    .setTitle('**Vous devez écrire le code Captcha**')
    .setColor("RANDOM")
    .setImage(`${item.type}`)
     .setFooter('Demandé par ' + message.author.tag)
    message.channel.send(embed).then(() => {
      message => message.delete(80000)
              message.channel.awaitMessages(filter, { maxMatches: 1, time: 0, errors: ['time'] })
      .then((collected) => {
        message.author.send({embed: {
   color: 1127128,
  description: `**${collected.first().author} <a:valid:641302704181870592> | vous avez approuvé le rôle avec succès**`
}})
      message.channel.send({embed: {
   color: 1127128,
  description: `**${collected.first().author} <a:valid:641302704181870592> | vous avez approuvé le rôle avec succès**`
}}).then(message => message.delete(5000))
                console.log(`[Typing] ${collected.first().author} vous avez déjà confirmé vous-même!`)
        message.guild.member(collected.first().author).addRole(rf)
        });
          })
    fs.writeFile("././paramètres/verify.json", JSON.stringify(verifyj), (err) => {
        if (err) console.error(err)
      })
    }