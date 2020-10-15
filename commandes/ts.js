const Discord = require('discord.js');

const fs = require("fs");

exports.run = async (bot, message, args) => {
let tests = JSON.parse(fs.readFileSync("./paramètres/tst.json", "utf8"));

  let testss = tests[message.guild.id].test;
  
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Emploiye du temps`)
  .addField("**<a:droite:641302495158599729>T CAP**", `le mardi \`${testss}\``)
  .addField("**<a:droite:641302495158599729>Producteur**", "<@428233517483425793>")
  .addField("**<a:droite:641302495158599729>Producteur**", "<@428233517483425793>")
  .addField("**<a:droite:641302495158599729>Producteur**", "<@428233517483425793>")
  .setThumbnail(message.guild.iconURL)
  .setFooter("REMARQUE : cette commande répertorie les utilisateurs disposant des autorisations sur le serveur.")
message.channel.send(embed)
  
};

exports.help = {
  name: 'autorités'
};