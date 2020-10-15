const Discord = require('discord.js');
const rm = require('../src/botinfo');
var iBotPermissions =
[
	'MANAGE_ROLES', 'MANAGE_CHANNELS',
	'KICK_MEMBERS', 'CREATE_INSTANT_INVITE',
	'MANAGE_EMOJIS', 'READ_MESSAGES',
	'SEND_MESSAGES', 'SEND_TTS_MESSAGES',
	'MANAGE_MESSAGES', 'EMBED_LINKS',
	'ATTACH_FILES', 'READ_MESSAGE_HISTORY',
	'MENTION_EVERYONE', 'ADD_REACTIONS',
	'CONNECT', 'SPEAK', 'USE_VAD', 'USE_EXTERNAL_EMOJIS', 'EXTERNAL_EMOJIS'
];

const moment = require("moment");
require("moment-duration-format");
exports.run = async (bot, message, args) => {
  if (message.channel.type !== 'dm') {
    const mp = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`J'ai envoyé un message d'information à vos messages privés! <:gmail:642770545821220868>`);
    message.channel.sendEmbed(mp) }
   let InviteBot = await bot.generateInvite(iBotPermissions).catch(console.error);
  const roleList = message.guild.roles.map(e => e.name).join(' | ');
  const emojiList = message.guild.emojis.map(e => e.toString()).join(' ');
  const duration = moment.duration(bot.uptime).format(" D [Jour], H [Heure], m [Minute], s [Seconde]");
  const online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  if (message.author.equals(bot.user)) return;
        new rm.menu(message.author, message.author.id, [new Discord.RichEmbed()
          .setDescription("**Information du bot**")
    .setColor("RANDOM")
    .addField("**<a:droite:641302495158599729>Producteur**", "<@428233517483425793>")
    .addField("**<a:droite:641302495158599729>Nom du bot**", `\`${bot.user.username}\``)
    .addField("**<a:droite:641302495158599729>Bot à inviter**", " [Inviter](" + InviteBot + ")")
    .addField("**<a:droite:641302495158599729>Serveur du producteur**", " [Rejoignez notre serveur](https://discord.gg/TCJejfk) ")          
         , new Discord.RichEmbed()
         .setDescription("**Information du bot**")
    .setColor("RANDOM")
    .addField("**<a:droite:641302495158599729>Nombre total de serveurs**", `\`${bot.guilds.size}\``)
    .addField("**<a:droite:641302495158599729>Nombre total d'utilisateurs**", `\`${bot.users.size}\``)
    .addField("**<a:droite:641302495158599729>Nombre total de canaux**", `\`${bot.channels.size}\``)
    .addField("**<a:droite:641302495158599729>Type de bibliothèque**", `\`discord.js\``)
    .addField("**<a:droite:641302495158599729>Version de Discord.js**", `\`${Discord.version}\``)
    .addField("**<a:droite:641302495158599729>Version**", `\`0.0.1\``)
    .addField("**<a:droite:641302495158599729>Temps de travail**", `\`${duration}\``)
    .addField("**<a:droite:641302495158599729>Utilisation de la mémoire**", `\`${(process.memoryUsage().heapUsed / 1024 / 1024)}\``)
    .addField("**<a:droite:641302495158599729>Ping**", `\`${bot.ping}\``)])};