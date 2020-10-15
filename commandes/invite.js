const Discord = require("discord.js");

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

module.exports.run = async (bot, message, args) =>
{
   message.delete().catch(console.error);
	var user = message.author;

	let szGeneratedInvite = await bot.generateInvite(iBotPermissions).catch(console.error);

	const embed = new Discord.RichEmbed()
	.setAuthor(bot.user.username + " | Générateur invite", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
	.setColor(2003199)
	.setDescription("\n\n\n\n<a:URL:630345339563671572> Pour m'inviter à ton discord [Cliquez ici!](" + szGeneratedInvite + ")")
	.setThumbnail(bot.user.avatarURL)
	.setFooter("Demandé par @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
	.setTimestamp();

	await message.channel.send({embed});
};

module.exports.help =
{
    name: "invite"
};