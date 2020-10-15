const Discord = require ('discord.js');

module.exports.run = async (bot, client, message, args) => {
  message.delete().catch(console.error);
    var user = message.mentions.users.first() || message.author;
    if (!args[0]) return message.channel.send({embed: {
  color: 3447003,
  description: `<:Erreur:630345327945449503> | Vous devez identifier quelqu'un qui écoute la chanson sur Spotify pour trouver les informations sur la chanson.\n Utilisation : \`${message.prefix}spotify (@utilisateur)\` `
}});
  
    if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
        try {
            var trackImg = user.presence.game.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            var trackName = user.presence.game.details;
            var trackAlbum = user.presence.game.assets.largeText;
            var trackAuthor = user.presence.game.state;

            const embed = new Discord.RichEmbed()
                .setAuthor('Infos sur la chanson Spotify', 'https://cdn.glitch.com/1e6a113c-2d65-47a7-b731-851a8c7d0a80%2Fspotify.gif?v=1572188578280')
                .setColor(0xdb954)
                .setThumbnail(trackImg)
                .setFooter(`Gilet Jaune || Spotify Système demandé par ${message.author.username}.`, `${message.author.avatarURL}`)
                .setDescription(`
\ **Spotify**'chantant =  \**${trackName}**\n
\ **Spotify**'album =  \**${trackAlbum}**\n
\ **Spotify**'artiste =  \**${trackAuthor}**\n
`)
                .addField('Spotify\'Paroles de chanson;', `**[${trackUrl}](${trackUrl})**`, false);
                
            return message.channel.send(embed);

        } catch (error) {
            return message.channel.send({embed: {
   color: 1127128,
  description: ` **${user.tag}** actuellement sur <a:spotify:638209580811157524>**Spotify** n'écoute pas la chanson.`
}});
        }

    } else {
        return message.channel.send({embed: {
   color: 1127128,
  description: `**${user.tag}** est actuellement en discord <a:spotify:638209580811157524>**Spotify** n'a pas ajouté`
}});
    }
};

exports.help = {
  name: 'spotify',
};
