const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return  message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  
  let tag = args[0];
  let tagg = db.fetch(`tag_${message.guild.id}`)
  
  if (!tag) return message.channel.send('Vous devez saisir un tag.')
  
    if(args[0] === "réinitialiser") {
    if(!tagg) {
      message.channel.send(`Vous ne pouvez pas réinitialiser quelque chose qui n'est pas défini.`)
      return
    }
    
    db.delete(`tag_${message.guild.id}`)
    message.channel.send(`Réinitialisation réussie du tag.`)
    return
  }
  
  db.set(`tag_${message.guild.id}`, tag)
  message.channel.send(`Tag correctement défini sur \`${tag}\`.`)
   
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: 'Tagı ayarlar.',
  usage: 'tag '
};