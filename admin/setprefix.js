const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  message.delete().catch(console.error);

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=473987297529036801)
  if(!args[0]) return message.channel.send({embed: {
   color: 1127128,
  description: `Utilisation = \`${message.prefix}setprefix <prefix>\``
}});

  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./paramètres/prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  var olcum = await message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:loading:641302653682581540> | Changement du Prefix, Restez en attente...`)
      .setColor("GREEN")).then(msg => msg.delete(3000));
            var sonuc = await message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:loading:641302704181870592> | Votre Prefix est prét!`)
      .setColor("GREEN")).then(msg => msg.delete(2000));
  const sEmbed = new Discord.RichEmbed()
  .setColor("#00FF00")
  .setTitle("Personnalisation Prefix")
  .setThumbnail(bot.user.displayAvatarURL)
  .addField(`Votre Prefix`, `\`${args[0]}\``);

  message.channel.send(sEmbed);

}