const Discord = require('discord.js')
const request = require("request").defaults({ encoding: null });
const isURL = require("is-url");

exports.run = async (bot, client, message, args) => {
  message.delete().catch(console.error);

          if (args.length !== 0) {
    message.channel.startTyping();
    const url = isURL(args[0]) ? args[0] : `http://${args[0]}`;
    const screenshot = request(`https://image.thum.io/get/width/1920/crop/675/maxAge/1/noanimate/${url}`);
    	const embed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setURL(url)
      .attachFiles([{
        attachment: screenshot,
        name: "screenshot.png"
      }])
      .setImage("attachment://screenshot.png");
    message.channel.stopTyping();
    message.channel.send(embed);
  } else {
    message.reply("vous devez fournir une URL pour générer une capture d'écran!");
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'invite',
  description: 'Çalışıp para kazanırsınız.',
  usage: 'invite'
};