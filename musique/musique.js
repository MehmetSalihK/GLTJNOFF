const Discord = require('discord.js');
const rm = require('../src/musique');
const fs = require("fs");
const paramètres = require('../paramètres.json');
const moment = require("moment");
require("moment-duration-format");
exports.run = (bot, message, args) => {
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
  
  
        new rm.menu(message.channel, message.author.id, [new Discord.RichEmbed()
        .setColor(3447003)
                    .setThumbnail(bot.user.avatarURL)
                    .addField('Commandes de musique:', '`1.` Commandes Youtube\n\
`2.` Commandes Radio\n')
         , new Discord.RichEmbed()
         .setColor(3447003)
                    .setFooter(`Pour de l'aide [${paramètres.prefix}aide]`, bot.user.avatarURL)
                    .addField("Commandes Youtube", `\`${paramètres.prefix}vien || ${paramètres.prefix}v || ${paramètres.prefix}join || ${paramètres.prefix}j\`: Canal sonore.
\`${paramètres.prefix}jouer || ${paramètres.prefix}j || ${paramètres.prefix}youtube || ${paramètres.prefix}yt || ${paramètres.prefix}play || ${paramètres.prefix}p\` Rechercher des chansons sur Youtube.

LES COMMANDES SUIVANTES NE FONCTIONNENT QUAND LORSQUE VOUS LANCEZ LA MUSIQUE:

\`${paramètres.prefix}pause || ${paramètres.prefix}p\` met la musique en pause.
\`${paramètres.prefix}continue || ${paramètres.prefix}c || ${paramètres.prefix}resume || ${paramètres.prefix}r\` reprend la musique.
\`${paramètres.prefix}suivant || ${paramètres.prefix}skip || ${paramètres.prefix}s\` passer en musique.
\`${paramètres.prefix}sonnerie\` montrer la musique.
\`${paramètres.prefix}ntm || ${paramètres.prefix}fuckoff || ${paramètres.prefix}stop || ${paramètres.prefix}s || ${paramètres.prefix}leave || ${paramètres.prefix}l\` fermer la musique.
\`${paramètres.prefix}volume || ${paramètres.prefix}v <0-200>\` augmente et réduit le son.`)])};