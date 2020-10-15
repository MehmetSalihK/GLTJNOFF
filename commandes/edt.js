const Discord = require('discord.js');

const fs = require("fs");

exports.run = async (bot, message, args) => {
const cap1 = JSON.parse(fs.readFileSync("./paramètres/cap1.json", "utf8"))

  let tcapdate = cap1[message.guild.id].LaDate;
  let tcapheure = cap1[message.guild.id].LHeure;
  
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Emploiye du temps`)
  .addField("**<a:droite:641302495158599729>T CAP Grp 1**", `\`${tcapdate}\` à \`${tcapheure}\` `)
  .setThumbnail("https://i2.wp.com/lyceeutrillo.fr/wp-content/uploads/2019/09/logo_emploi_du_temps.png?resize=300%2C291")
  .setFooter("REMARQUE : cette commande répertorie les utilisateurs disposant des autorisations sur le serveur.")
message.channel.send(embed)
  
};

exports.help = {
  name: 'autorités'
};