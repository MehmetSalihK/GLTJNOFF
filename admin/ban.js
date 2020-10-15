const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=428233517483425793)
  message.delete().catch(console.error);
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send({embed: {color: 1127128, description: `Utilisation = \`${message.prefix}ban <@utilisateur> <cause>\``}});
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: {color: 1127128, description: `<:attention:641323112687861777> Je ne peux pas ban cette personne!`}});

    let banEmbed = new Discord.RichEmbed()
    .setDescription(`<a:attention:641302534262358035> ~**Ban**~`)
    .setColor("RED")
    .addField("L'utilisateur mange ban", `${bUser}`)
    .addField("L'utilisateur à fait ban", `<@${message.author.id}>`)
    .addField("Salle de ban", message.channel)
    .addField("temps", message.createdAt)
    .addField("À cause", bReason);

    message.guild.member(bUser).ban(bReason);
  return message.channel.send(banEmbed)
}

module.exports.help = {
  name:"kick"
}