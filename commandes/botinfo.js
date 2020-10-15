const Discord = require('discord.js');
const moment = require("moment");
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

require("moment-duration-format");
exports.run = async function(bot, message, args) {
   let InviteBot = await bot.generateInvite(iBotPermissions).catch(console.error);
  const roleList = message.guild.roles.map(e => e.name).join(' | ');
  const emojiList = message.guild.emojis.map(e => e.toString()).join(' ');
  const duration = moment.duration(bot.uptime).format(" D [Jour], H [Heure], m [Minute], s [Seconde]");
  const online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  if (message.author.equals(bot.user)) return;
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Özel mesajlarına bilgi mesajımı gönderdim! <:gmail:641302493757964288> ');
    message.channel.sendEmbed(ozelmesajkontrol) }
         message.author.send({embed: {
    color: 3447003,
    description: "S'il y a des problèmes ou des problèmes avec le bot, vous pouvez nous contacter en signalant le problème <@428233517483425793>.",
    fields: [{
        name: "**Information du bot**",
        value: `**<a:droite:641302495158599729>Producteur**\n<@428233517483425793>
\n**<a:droite:641302495158599729>Nom du bot**\n\`${bot.user.username}\`
\n**<a:droite:641302495158599729>Bot à inviter**\n[Inviter](${InviteBot})
\n**<a:droite:641302495158599729>Serveur du producteur**\n[Rejoignez notre serveur](https://discord.gg/TCJejfk)
\n**<a:droite:641302495158599729>Nombre total de serveurs**\n\`${bot.guilds.size}\`
\n**<a:droite:641302495158599729>Nombre total d'utilisateurs**\n\`${bot.users.size}\`
\n**<a:droite:641302495158599729>Nombre total de canaux**\n\`${bot.channels.size}\`
\n**<a:droite:641302495158599729>Type de bibliothèque**\n\`discord.js\`
\n**<a:droite:641302495158599729>Version de Discord.js**\n\`${Discord.version}\`
\n**<a:droite:641302495158599729>Version**\n\`0.0.1\`
\n**<a:droite:641302495158599729>Temps de travail**\n\`${duration}\`
\n**<a:droite:641302495158599729>Utilisation de la mémoire**\n\`${(process.memoryUsage().heapUsed / 1024 / 1024)}\`
\n**<a:droite:641302495158599729>Ping**\n\`${bot.ping}\``
      },
    ],
  }
});
    }
        

exports.help = {
  name: 'sunucubilgi'
};