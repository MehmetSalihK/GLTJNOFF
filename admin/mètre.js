const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')
 
exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
  if (message.author.id !=428233517483425793)
   message.delete().catch(console.error);
        if(!args[0]) {
                message.channel.send({embed: {
   color: 1127128,
  description: `**Utilisation correcte = \`${message.prefix}mètre <nombre> <#canal>\`**`
}});
  }
 
        let profil = JSON.parse(fs.readFileSync("./paramètres/mètre.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  if (!mentionedChannel && args[0] !== "remettre")
 
 
        if(args[0] === "remettre") {
                if(!profil[message.guild.id]) {
                        const embed = new Discord.RichEmbed()
                                .setDescription(`Le compteur ne peut pas être réinitialisé car il n'est pas défini!`)
                                .setColor("RANDOM")
                                .setTimestamp()
                        message.channel.send({embed})
                        return
                }
                delete profil[message.guild.id]
                fs.writeFile("./paramètres/mètre.json", JSON.stringify(profil), (err) => {
                        console.log(err)
                })
                const embed = new Discord.RichEmbed()
                        .setDescription(`Réinitialisation du compteur avec succès!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(isNaN(args[0]))
 
        if(args[0] <= message.guild.memberCount) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`Veuillez spécifier une valeur supérieure à [${message.guild.memberCount}]!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(!profil[message.guild.id]){
                profil[message.guild.id] = {
                        sayi: args[0],
      canal: mentionedChannel.id
                };
        }
       
        profil[message.guild.id].sayi = args[0]
  profil[message.guild.id].canal = mentionedChannel.id
       
        fs.writeFile("./paramètres/mètre.json", JSON.stringify(profil), (err) => {
                console.log(err)
        })
 var olcum = await message.channel.send({embed: {
   color: 1127128,
  description: `<a:Loading:630345344634454016> Récupération d'informations, Veuillez patienter...`
}}).then(msg => msg.delete(3000));
 var sonuc = await message.channel.send({embed: {
   color: 1127128,
  description: `<a:valid:630345357267697675> Mètre ajusté...`
}}).then(msg => msg.delete(3000));
        const embed = new Discord.RichEmbed()
        .setDescription("**~Mètre~**")
        .setColor(0x00AE86)
        .addField("Nombre de pièces mis!<a:gearz:630345479988707340>", `\`${args[0]}\``)
    .addField("Ensemble de canaux de salle!<a:gearz:630345479988707340>", `${mentionedChannel}`)
                .setFooter(`Pour de l'aide [${message.prefix}aide]`, bot.user.avatarURL)
                .setColor("RANDOM")
                .setTimestamp()
        message.channel.send({embed})
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayaç-ayarla'],
        permLevel: 2,
        kategori: "moderasyon"
}
 
exports.help = {
        name: 'sayaç-ayarla',
        description: 'Sayaçı Ayarlar!',
        usage: 'sayaç-ayarla [sayı/sıfırla] [kanal]'
}
   