const Discord = require('discord.js');

exports.run = (bot, message, args) => {
if (message.author.id !=428233517483425793)
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({embed: {color: 15158332,description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332,description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
if (message.author.id !=428233517483425793) { return; }
  message.delete();
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('<a:party_discord:641302550498377749> <a:Pointing:641302523801763870>[Cliquez Ici!](https://discord.gg/TCJejfk) <a:URL:641302549630287874><a:HyperBlob:641302544135487488>')
      .setImage("https://media.giphy.com/media/ZFQ4IlYTyDugafPwSA/giphy.gif")
      bot.users.forEach(u => {
u.sendEmbed(embed)
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['duyur'],
  permLevel: 4
};

exports.help = {
  name: 'reklamyap',
  description: 'İstediğiniz şeyi bota duyurtur.',
  usage: 'dmduyuru [duyurmak istediğiniz şey]'
};