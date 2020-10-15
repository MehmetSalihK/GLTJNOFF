const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

exports.run = function(bot, message, args) {
    message.delete().catch(console.error);
  
  if (message.author.equals(bot.user)) return;
  
    if (message.channel.type !== 'dm') {
    const messageprivé = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription("J'ai envoyé un message à vos messages privés! :postbox: ");
    message.channel.sendEmbed(messageprivé).then(d_msg => { d_msg.delete(8990); }); }
  const botinfo = new Discord.RichEmbed()
.setDescription("**Information du bot**")
    .setColor("RANDOM")
    .addField("**<a:droite:641302495158599729>Producteur**", "<@428233517483425793>")
    .addField("**<a:droite:641302495158599729>Nom du bot**", `\`${bot.user.username}\``)
    .addField("**<a:droite:641302495158599729>Bot à inviter**", " [Inviter](https://discordapp.com/api/oauth2/authorize?client_id=567070316568903748&permissions=8&scope=bot)")
    .addField("**<a:droite:641302495158599729>Serveur du producteur**", " [Rejoignez notre serveur](https://discord.gg/nbqUyUK) ")
  .setFooter(`Pour de l'aide [${message.prefix}aide]`, bot.user.avatarURL);
  /*
   * Takes a Date object, defaults to current date.
   */

  return message.author.send(botinfo);
};

exports.help = {
  name: 'botinfo'
};