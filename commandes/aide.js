const Discord = require('discord.js');


exports.run = function(bot, message, args) {
         let pages = ["[❯ :scroll: Commandes Générales]\n\n[-help](https://discord.me/mehmetsalihk)  •  Donnera la liste des commendes.\n[-serveurinfo](https://discord.me/mehmetsalihk)  •  Fournit les informations sur le serveur.\n[-info](https://discord.me/mehmetsalihk)  • Donnera l'avatar de l'utilisateur.\n[-bot](https://discord.me/mehmetsalihk)  • Invitation de Bot à lancer le lien.\n[-musique](https://discord.me/mehmetsalihk)  • Pour la musique.","[❯ :scroll: Commandes Amusantes](https://discord.me/mehmetsalihk)\n\n Bientôt va être disponible","[❯ :scroll: Commandes Admin](https://discord.me/mehmetsalihk)\n\n[-kick](https://discord.me/mehmetsalihk) •   Jeter quelqu'un du serveur.\n[-clearchat](https://discord.me/mehmetsalihk) •  Supprimer tout les messages.\n[-important](https://discord.me/mehmetsalihk) •  Fournit une annonce.\n[-vote](https://discord.me/mehmetsalihk) • pour votes.\n[-coup-de-pied](https://discord.me/mehmetsalihk) • Jeter quelqu'un du serveur en votant.\n"]; // pages
  let page = 1; // page 1


  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${message.author.username}` , bot.user.avatarURL)

  .setFooter(`Pour de l'aide [${message.prefix}aide] • Page ${page} / ${pages.length}`, bot.user.avatarURL)

  .setDescription(pages[page-1])

  message.channel.send(embed).then(msg => {

    msg.react('⬅').then(r => {
      msg.react('➡')
      msg.react('🗑')

      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
      const deleteFilter = (reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
      const deletemessage = msg.createReactionCollector(deleteFilter, { time: 60000 });

      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Pour de l'aide [${message.prefix}aide] • Page ${page} / ${pages.length}`, bot.user.avatarURL)
        msg.edit(embed)
        r.remove(r.users.filter(u => u === message.author).first());
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Pour de l'aide [${message.prefix}aide] • Page ${page} / ${pages.length}`, bot.user.avatarURL)
        msg.edit(embed)
        r.remove(r.users.filter(u => u === message.author).first());
              })
      deletemessage.on('collect', r => {
        msg.delete();
})

    })
  })
}
        

exports.help = {
  name: 'aide'
};