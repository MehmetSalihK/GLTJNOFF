const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  message.delete().catch(console.error);
  if (message.author.id !=428233517483425793)
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<:attention:641302530613313536> | Vous avais pas l'autorisation!`).setColor(15158332));
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!rMember) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`S'il vous plaît entrer un nom d'utilisateur.\nExemple: ` + message.prefix + `donnerrole **@utilisateur @role**`).setColor(10038562).setAuthor(`demandé par ${message.author.username}.`, message.author.avatarURL).setTimestamp());
    let role = message.mentions.roles.first()

    if (!role) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Veuillez entrer un nom de rôle.\nExemple: ` + message.prefix + `donnerrole **@utilisateur @role**`).setColor(10038562).setAuthor(`demandé par ${message.author.username}`, message.author.avatarURL).setTimestamp());
    let aRole = message.mentions.roles.first()
    if (!aRole) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Je ne trouve pas ce rôle.\nExemple: ` + message.prefix + `donnerrole **@utilisateur @role**`).setColor(10038562).setAuthor(`demandé par ${message.author.username}`, message.author.avatarURL).setTimestamp());

    if (rMember.roles.has(aRole.id)) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Cet utilisateur est déjà dans ce rôle.').setColor(10038562));
    await (rMember.addRole(aRole.id))
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`${message.author.username} à donné le rôle \`${role.name}\` à ${rMember}! <a:Valider:641302704181870592>`).setColor('RANDOM'));

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolver', 'rolekle'],
  permLevel: "0"
};

exports.help = {
  name: "rolver",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};