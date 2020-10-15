const Discord = require("discord.js");

exports.run = (bot, message, args) => {
   message.delete();
const color = args[0]
       const embed = new Discord.RichEmbed()
        .setColor("0x" + color)
       .setDescription(`Pour participer au concour!`)
        .setThumbnail("https://cdn.glitch.com/88535ec8-18b1-4666-8b6e-77042142324c%2F71TpE6xqyIL._SY445_.jpg?v=1574007992540.png")
        .addField(`Faut inviter au moins`,`\`3\` personnes sur ce serveur`, true)
       message.channel.send({embed}).then(function(message) {

         message.react(`645631090286919711`);

         message.react(`645630761520726017`);

       })}

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