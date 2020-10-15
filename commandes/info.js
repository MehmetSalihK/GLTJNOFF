const Discord = require('discord.js');
const moment = require("moment");

const status = {
    online: "<a:online:641302547000328202>En Ligne",
    idle: "<a:offline:641302478641430528>Inactif",
    dnd: "<a:offline:641302544865558538>Ne Pas Déranger",
    offline: "<a:offline:641302479765504014>Hors Ligne"
};

exports.run = (bot, message, args) =>{
  let inline = true
    var permissions = [];
    var acknowledgements = "Non";
   
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); }); 
    
    if(message.member.hasPermission("KICK_MEMBERS")){
        permissions.push("Membres Kicks");
    }
    
    if(message.member.hasPermission("BAN_MEMBERS")){
        permissions.push("Ban des membres");
    }
    
    if(message.member.hasPermission("ADMINISTRATOR")){
        permissions.push("Directeur");
    }

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Gérer les messages");
    }
    
    if(message.member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Gérer les canaux");
    }
    
    if(message.member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Parlez à tout le monde");
    }

    if(message.member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Gérer les surnoms");
    }

    if(message.member.hasPermission("MANAGE_ROLES")){
        permissions.push("Gérer les rôles");
    }

    if(message.member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Gérer les canaux Web");
    }

    if(message.member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Gérer les Emojis");
    }

    if(permissions.length == 0){
        permissions.push("Permissions non trouvée");
    }

    if(`<@${member.user.id}>` == message.guild.owner){
        acknowledgements = 'Oui';
    }

    const embed = new Discord.RichEmbed()
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor(randomColor)
        .setFooter(`ID: ${message.author.id}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp()
        .addField(`Status`,`${status[member.user.presence.status]}`, true)
        .addField("Date d'adhésion ",`\`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}\``, true)
        .addField("Jeux Vidéo", `${member.user.presence.game ? `<a:jeu:643215171342434309> \`${member.user.presence.game.name}\`` : "<a:jeu:643215171342434309> \`Ne joue pas\`"}`,inline, true)
        .addField("Le compte Discord créé le",`\`${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}\``, true)
        .addField("Les pérmissions ", `\`${permissions.join(', ')}\``, true)
        .addField(`Les Rôles [${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Aucun rôle"}`, true)
        .addField("Propriétaire du serveur ", `\`${acknowledgements}\``, true);
        
    message.channel.send({embed});

}