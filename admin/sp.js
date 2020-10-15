const Discord = require("discord.js");
const bot = new Discord.Client();


module.exports.run = async (bot, message, args) => {
    message.delete().catch(console.error);
  if (message.content) {
    if (message.author.id !=428233517483425793)
if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
        console.log("<a:NON:641302530613313536>Vous avais pas l'autorisation!");
        return;
      } else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES")) {
        message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
        console.log("<a:NON:641302530613313536>Vous avais pas l'autorisation!");
        return;
      }

      // Only delete messages if the channel type is TextChannel
      // DO NOT delete messages in DM Channel or Group DM Channel
      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messages = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            const chatsupprimé = new Discord.RichEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setTitle('Messages supprimés🌌')
    .addField('Autorisation', `\`${message.author.username}\` <a:3863_gearz:641302613505081347>`)
    .addField('Messages supprimés', `\`${+messages}\` <a:ablobtrash:641302558971002891> `)
      .setFooter(`Pour de l'aide [${message.prefix}aide]`, bot.user.avatarURL)
    return message.channel.send(chatsupprimé)
          .catch(err => {
            console.log('Erreur lors de la suppression par lot');
            console.log(err);
          });
      })
      }
  }}