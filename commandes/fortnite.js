const Discord = require('discord.js');
const fortnite = require('fortnitetracker-7days-stats');

exports.run = (bot, message, args) => {
   message.delete().catch(console.error);
    if (args.length < 2) {
      message.channel.send({embed: {
  color: 3447003,
  description: `<:Erreur:630345327945449503> | Utilisation : \`${message.prefix}fortnite pc (Nom d'utilisateur)\` `
}});
        return;
    }

    var name = "";
    for (var i = 1; i < args.length; i++) {
        name += args[i] + " ";
    }
    name = name.trim(); // remove last space

    var url = "https://fortnitetracker.com/profile/pc/" +
        encodeURIComponent(name);
    message.channel.startTyping();

    fortnite.getStats(name, "pc", (err, result) => {
        if (err) {
          message.channel.send({embed: {
  color: 0xff0000,
  description: "<:Erreur:630345327945449503> | Nom d'utilisateur incorrect!"
}});
            message.channel.stopTyping();
            return;
        }

        var embed = new Discord.RichEmbed()
            .setAuthor(result.accountName, "https://cdn2.unrealengine.com/Fortnite%2Fhome%2Ffn_battle_logo-1159x974-8edd8b02d505b78febe3baacec47a83c2d5215ce.png")
            .setDescription('')
            .addField("Matches gagnés", result.wins)
            .addField("Jeux joués", result.matches)
            .addField("Taux de victoire", ~~result.wr + "%")
            .addField("Total des meurtres", +result.kills)
            .addField("K/D", +result.kd)
            .setColor("RANDOM")
            .setURL(url)
            .setThumbnail(result.skinUrl);

        message.channel.stopTyping();
        message.channel.send(embed);
    });
};

exports.help = {
    name: 'fortnite'
};