const Discord = require('discord.js');

exports.run = (bot, message, args) => {

      const embed = new Discord.RichEmbed()
          .setDescription(`Merci de m’avoir contacté!\nMon ordinateur est mort subitement et je ne suis inclus que le 10/05/2020.\nEn raison de mon absence, je ne peux pas accéder au Discord pendant un certain temps.\nMais en cas d'urgence, mon collègue Monsieur <@214033624595431425> prendra soin de vous.\nCordialement,\n\n<@428233517483425793>`)
          .setAuthor(`Ceci est un Message Automatique!`)
         .setThumbnail("https://cdn.glitch.com/d1f46aba-aced-4b1d-a8b1-2cdd9b15dbdd%2F20200419_231550.gif")
          .setColor(0x00AE86)
          message.channel.send({embed});
}