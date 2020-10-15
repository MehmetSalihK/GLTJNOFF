const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  message.delete().catch(console.error);

          const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

message.channel.send(`ID: \`${member.user.id}\`.`);

message.delete();

}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'invite',
  description: 'Çalışıp para kazanırsınız.',
  usage: 'invite'
};