const Discord = require('discord.js');
const fs = require('fs');
let hereBlock = JSON.parse(fs.readFileSync("./paramètres/hereBlock.json", "utf8"));

exports.run = async (client, message) => {
  
    let args = message.content.split(' ').slice(1);
    const option = args.slice(0).join(' ');

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
    if(option.length < 1) return message.channel.send({embed: {
    color: 1127128,
    description: `**@Everyone et @Here Système d'interdiction**\n\nUtilisation = \`${message.prefix}hereblock ouvre\` & \`${message.prefix}hereblock ferme\``
  }});

  if (option !== "ouvre" && option !== "fermer" && option !== "on" && option !== "off") return message.reply("aç veya kapat yaz!")

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 1127128, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
    if (option === "ouvre" || option === "on") {
    
    message.delete();
        
      
      message.channel.send({embed: {
   color: 1127128,
  description: `~ hereBlock Ouvert! ~ \n\n\<@${message.author.id}> à ouvert! Vous avez le droit de mètre @Everyone et @Here.`
}})

  if(!hereBlock[message.guild.id]){
        hereBlock[message.guild.id] = {
            hereBlock: "ouvre"
          };
  };

          fs.writeFile("./paramètres/hereBlock.json", JSON.stringify(hereBlock), (x) => {
        if (x) console.error(x)
      })
    };

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 1127128, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
    if (option === "fermer" || option === "off") {
  message.channel.send(`**@Everyone et @Here Blocking System:** **Off**!`).then(m => m.delete(5000));
    
  if(!hereBlock[message.guild.id]){
        hereBlock[message.guild.id] = {
            hereBlock: "fermer"
          };
  };

        fs.writeFile("./paramètres/hereBlock.json", JSON.stringify(hereBlock), (x) => {
        if (x) console.error(x)
      })

       delete hereBlock[message.guild.id]
       delete hereBlock[message.guild.id].hereBlock

        message.channel.send({embed: {
   color: 1127128,
  description: `~ hereBlock Fermé ~ \n\n\<@${message.author.id}> à interdits @Everyone et @Here!`
}})
    

      
    };
}

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['here-engel', 'everyone-engel', 'everyonehereengel'],
        permLevel: 3
      };
      
    exports.help = {
        name: 'everyone-engelle',
        description: 'Everyone ve Here engelleme sistemini açıp kapatmanızı sağlar.',
        usage: 'everyone-engelle <aç/kapat>'
    };