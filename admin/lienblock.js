const Discord = require('discord.js');
const fs = require('fs');
let lienObstacle = JSON.parse(fs.readFileSync("./paramètres/addBlock.json", "utf8"));

exports.run = (bot, message) => {

    let args = message.content.split(' ').slice(1);
    const option = args.slice(0).join(' ');
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if(option.length < 1) return message.channel.send({embed: {
    color: 1127128,
    description: `Utilisation = \`${message.prefix}lienblock ouvre\` & \`${message.prefix}lienblock ferme\``
  }});

  if(option.length !== "ouvre" && option !== "fermer" && option !== "on" && option !== "off" )
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 1127128, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if(option === "ouvre" || option === "on") {
  
        message.channel.send({embed: {
   color: 1127128,
  description: `~ AddBlock Ouvert! ~ \n\n\<@${message.author.id}> à fermer les annonces! Interdiction les liens.`
}})

        if(!lienObstacle[message.guild.id]) {
        lienObstacle[message.guild.id] = {
        lienObstacle: "ouvre"
        };
     };

       var mentionedChannel = message.mentions.channels.first();
       fs.writeFile("./paramètres/addBlock.json", JSON.stringify(lienObstacle), (x) => {
       if (x) console.error(x)
       })
     };
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 1127128, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
       if (option === "ferme" || option === "off") {
  message.channel.send({embed: {
   color: 1127128,
  description: `~ AddBlock Fermé ~ \n\n\<@${message.author.id}> à ouvert les annonces! Plus d'interdiction de lien`
}})
      if(!lienObstacle[message.guild.id]) {
        lienObstacle[message.guild.id] = {
            lienObstacle: "ferme",
          canal: mentionedChannel.id
          };
      };

        fs.writeFile("./paramètres/addBlock.json", JSON.stringify(lienObstacle), (x) => {
            if (x) console.error(x)
          })
  
        delete lienObstacle[message.guild.id]
        delete lienObstacle[message.guild.id].lienObstacle
};
}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['link-engel'],
        permLevel: 3
      };
      
      exports.help = {
        name: 'link-engelle',
        description: 'Küfür engelleme sistemini, açıp kapatmanızı sağlar.',
        usage: 'link-engelle <aç> veya <kapat>'
      };