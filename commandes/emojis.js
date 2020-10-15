const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  message.delete().catch(console.error);
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription(`${message.guild.emojis.map(e=>e.toString()).join(" **|** ") || message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n')}\n`)
  return message.channel.send(embed)
};

exports.help = {
  name: 'emojis'
};