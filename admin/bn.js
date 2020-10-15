const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => {
  
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");
  
      if(message.mentions.users.size === 0) {
          return message.channel.send("Vous devez mentionner un utilisateur");
      }

      var kick = message.guild.member(message.mentions.users.first());
      if(!kick) {
          return message.channel.send("L'utilisateur ne se trouve pas sur Terre !");
      }

      if(message.guild.member(kick).hasPermission("KICK_MEMBERS")) return message.channel.send("Impossible de l'expulser !")

      message.delete();
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");

      if(message.mentions.users.size === 0) {
          return message.channel.send("Vous devez mentionner un utilisateur");
      }

      var ban = message.guild.member(message.mentions.users.first());
      if(!ban) {
          return message.channel.send("L'utilisateur ne se trouve pas sur Terre !");
      }

      if(message.guild.member(kick).hasPermission("BAN_MEMBERS")) return message.channel.send("Impossible de le bannir !")

      if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
          return message.channel.send("Je n'ai pas la permission pour ban");
      }
      ban.ban().then(member => {
          var ban_embed = new Discord.RichEmbed()
          .setColor("#40A497")
          .setTitle("Ban :")
          .addField("Membre banni:", `${member.user.username}`)
          .addField("ID :", `${member.user.id}`)
          .addField("Modérateur :", `${message.author.username}`)
          message.channel.send({ban_embed})
          console.log("Un utilisateur a été ban !")
      });
    
}

module.exports.help = {
  name:"kick"
}