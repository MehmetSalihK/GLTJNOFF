const fs = require('fs');
const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=428233517483425793)
   message.delete().catch(console.error);
  let journalInvitation = JSON.parse(fs.readFileSync('./paramètres/journalinvitation.json', 'utf8'));
  let canalId = message.channel.id,
    guildID = message.guild.id,
    canalDinvitation;

  if (guildID in journalInvitation) canalDinvitation = bot.channels.get(journalInvitation[guildID]).name;
  else canalDinvitation = "non corrigé";

  if (!args[0]) 
return message.channel.send({embed: {
   color: 1127128,
  description: `
**Journal d'invitation:** \`\`${message.prefix}invitation canalInvitation #canal\`\` | **pour fermer**: \`\`${message.prefix}invitation canalInvitation cencel\`\` 

**Canal d'enregistrement d'invitation:**  ${canalDinvitation}`
}});


  switch (args[0]) {
    case "invitationk":
    case "canalInvitation":
    case "journalInvitation":
      if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({embed: {
   color: 1127128,
  description: `<a:attention:630345321825828894> | Vous avais pas l'autorisation!`}});
      if (!args[1]) return message.channel.send({embed: {
   color: 1127128,
  description: `S'il vous plaît spécifier un canal!`}});
      if (args[1].toLowerCase() == "cencel") {
        delete journalInvitation[guildID];
        fs.writeFile('./paramètres/journalinvitation.json', JSON.stringify(journalInvitation), (err) => {
          if (err) console.log(err);
        });
        message.channel.send("Canal du journal d'invitation fermé!");
      } else {
        if (!message.mentions.channels.first()) return message.channel.send({embed: {
   color: 1127128,
  description: `S'il vous plaît spécifier un canal!`}});
        journalInvitation[guildID] = message.mentions.channels.first().id;
        fs.writeFile('./paramètres/journalinvitation.json', JSON.stringify(journalInvitation), (err) => {
          if (err) console.log(err);
        });
        message.channel.send({embed: {
   color: 1127128,
  description: `<#${journalInvitation[guildID]}> Canal d'enregistrement des invitations déterminé!`}});
      }
   
  }
}



module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ayarlar"],
  permLevel: 3
};

module.exports.help = {
  name: 'davetkanal',
  description: 'İstediğiniz şeyi bota yazdırır',
  usage: 'ayar hg&bb #kanal'
};
//XiR