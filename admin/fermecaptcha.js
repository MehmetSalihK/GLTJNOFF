const Discord = require('discord.js')
const fs = require('fs')
const verifyj = JSON.parse(fs.readFileSync("./paramètres/verify.json", "utf8"))
exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=428233517483425793)
   message.delete().catch(console.error);
    if(!verifyj[message.guild.id]) verifyj[message.guild.id] = {
        channel: "Undefined",
        onoff: "Off",
        rolev: "Undefined"
    }
    if(verifyj[message.guild.id].onoff === "Off") return message.channel.send({embed: {
   color: 1127128,
  description: `Déjà éteint!`
}})
verifyj[message.guild.id].onoff = "off"
  message.channel.send({embed: {
   color: 1127128,
  description: `<a:Valider:641302704181870592> | Éteint avec succès`
}})
fs.writeFile("./paramètres/verify.json", JSON.stringify(verifyj), (err) => {
    if (err) console.error(err)
  })
}