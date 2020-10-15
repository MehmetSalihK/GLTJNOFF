const Discord = require('discord.js');


exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return  message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
    message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Saisie de commande').setDescription('Supprimer les fichiers requis?.').setFooter(`Si vous êtes d'accord avec cette action, tapez simplement "oui". Cette action se terminera dans 30 secondes.`))
.then(() => {
message.channel.awaitMessages(response => response.content === 'oui', {
max: 1,
time: 30000,
errors: ['time'],
})
.then((collected) => {
          message.guild.channels.forEach(channel => channel.delete())



  



        message.channel.send(`J'ai tout effacé.`);
    });
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'hazır-odalar-silme',
};