const Discord = require("discord.js");

exports.run = (bot, message, args) => {
   message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});

   let question = args.join(' ');
  let mesaj = args.slice(0).join(' ');

   let user = message.author.username

   if (!question) return message.channel.send({embed: {
   color: 1127128,
  description: `Utilisation = \`${message.prefix}vote <Vous devez écrire quelque chose!>\``
}}).then(m => m.delete(5000));

     console.log("oylama komutu " + message.author.username + '#' + message.author.discriminator + " tarafından kullanıldı.")
     message.channel.sendEmbed(

       new Discord.RichEmbed()

       .setColor("RANDOM")
       .setThumbnail("https://cdn.glitch.com/88535ec8-18b1-4666-8b6e-77042142324c%2Fgiphy.gif?v=1571074761793.gif")
       .setTimestamp()

       .addField(`**VOTEZ**`, `**${question}**`)).then(function(message) {

         message.react(`641302654718443522`);

         message.react(`641302664356823040`);

       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['oylama', 'anket'],

  permLevel: 2
};

exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.',
  usage: 'oylama <oylamaismi>'
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

module.exports.help = {
  name: "oylama"
}