const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  
  let isEnabled;
  message.channel.send({embed: {
   color: 1127128,
  description: `Notre équipe autorisée prendra soin de vous dans un instant.`
}});
  let chan = message.channel;
  let CanalDeSoutien = "639291981385695232";/// buraya canlı destek mesajı atılacak kanal idisi
  const embed = new Discord.RichEmbed()
      .addField('Prudence', `Demande de support en direct`)
      .setColor("BLUE")
      .addField(`Information`, `Serveur: ${message.guild.name} \n Canal: ${message.channel.name} \n Demande d'assistance: ${message.author.tag}`)
      .setFooter("☪TüRk-BoT☪ | Support en direct")
  bot.channels.get(CanalDeSoutien).send(embed)
  .then(async embedMessage => {
        await embedMessage.react('✅')
        await embedMessage.react('❎')
        const emoji = {
            ACCEPTER: '✅',
            ANNULER: '❎',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.ACCEPTER:
                    {
            if (message.content === 'relier') collector.stop('success')
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Demande de support en direct acceptée. Pour annuler, écrivez s'il vous plaît \`cencel\`.`}})
                      .then(async embedMessage => {
        await embedMessage.react('❎')
        const emoji = {
            ANNULER: '❎',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.ANNULER:
                    {
             if (message.content === 'cencel') collector.stop('aborted')
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Vous avez annulé la demande d'assistance en direct.`}})
      chan.send({embed: {
   color: 1127128,
  description: `Votre demande d'assistance en direct a été annulée par l'autorité.`}})

          isEnabled === false

                        break;
                    }
            };reaction.remove(reaction.users.filter(u => u === message.author).first())
          message.delete()
          embed.delete()
        }); 
        collector.on('end', () => embedMessage.delete());
    })
      chan.send({embed: {
   color: 1127128,
  description: `Votre demande d'assistance en direct a été acceptée par l'autorité. S'il vous plaît écrivez \`cencel\` pour annuler.`}})
                      .then(async embedMessage => {
        await embedMessage.react('❎')
        const emoji = {
            ANNULER: '❎',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.ANNULER:
                    {
             if (message.content === 'cencel') collector.stop('aborted')
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Vous avez annulé la demande d'assistance en direct.`}})
      chan.send({embed: {
   color: 1127128,
  description: `Votre demande d'assistance en direct a été annulée par l'autorité.`}})

          isEnabled === false

                        break;
                    }
            };reaction.remove(reaction.users.filter(u => u === message.author).first())
          message.delete()
          embed.delete()
        }); 
        collector.on('end', () => embedMessage.delete());
    })
      isEnabled = true
      bot.on('message', message => {
        function contact() {
          if (isEnabled === false) return
          if (message.author.id === bot.user.id) return
          if (message.content.startsWith('cencel')) {
            message.channel.send({embed: {
   color: 1127128,
  description: `Vous avez annulé la demande d'assistance en direct.`}})
            if (message.channel.id === chan.id)
              bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Demande d'assistance en direct annulée par l'utilisateur.`}})
            if (message.channel.id === CanalDeSoutien)
              chan.send({embed: {
   color: 1127128,
  description: `Votre demande d'assistance en direct a été annulée par l'autorité.`}})
            return isEnabled = false
          }
          if (message.channel.id === chan.id)
            bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `${message.author.tag} : ${message.content}`}})
          if (message.channel.id === CanalDeSoutien)
            chan.send(`${message.content}`)
        }
        contact(bot)
      })
 break;
                    }
                case emoji.ANNULER:
                    {
             if (message.content === 'cencel') collector.stop('aborted')
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Vous avez annulé la demande d'assistance en direct.`}})
      chan.send({embed: {
   color: 1127128,
  description: `Votre demande d'assistance en direct a été annulée par l'autorité.`}})

          isEnabled === false

                        break;
                    }
            };reaction.remove(reaction.users.filter(u => u === message.author).first());
          message.delete()
        }); 
        collector.on('end', () => embedMessage.delete());
    })
  const collector = bot.channels.get(CanalDeSoutien).createCollector(message => message.content.startsWith(''), {
    time: 0
  })
  bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Pour vous connecter à l’appel de support, veuillez taper \`relier\`, annuler \`cencel\``
}})
  collector.on('message', (message) => {
    if (message.content === 'cencel') collector.stop('aborted')
    if (message.content === 'relier') collector.stop('success')
  })
  collector.on('end', (collected, reason) => {
    if (reason === 'time') return message.channel.send({embed: {
   color: 1127128,
  description: `Votre demande d'assistance en ligne a expiré.`
}})
    if (reason === 'aborted') {
      message.channel.send({embed: {
   color: 1127128,
  description: `Votre demande d'assistance en direct a été refusée par l'autorité.`
}})
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `La demande d'assistance en direct a été refusée.`
}})
    }
    if (reason === 'success') {
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Demande de support en direct acceptée. Pour annuler, écrivez s'il vous plaît \`cencel\`.`}})
      .then(async embedMessage => {
        await embedMessage.react('❎')
        const emoji = {
            ANNULER: '❎',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.ANNULER:
                    {
             if (message.content === 'cencel') collector.stop('aborted')
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Vous avez annulé la demande d'assistance en direct.`}})
      chan.send(`Votre demande d'assistance en direct a été annulée par l'autorité.`)

          isEnabled === false

                        break;
                    }
            };
        }); 
        collector.on('end', () => embedMessage.delete());
    })
      chan.send(`Votre demande d'assistance en direct a été acceptée par l'autorité. S'il vous plaît écrivez \`cencel\` pour annuler.`)
      .then(async embedMessage => {
        await embedMessage.react('❎')
        const emoji = {
            ANNULER: '❎',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.ANNULER:
                    {
             if (message.content === 'cencel') collector.stop('aborted')
      bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `Vous avez annulé la demande d'assistance en direct.`}})
      chan.send(`Votre demande d'assistance en direct a été annulée par l'autorité.`)

          isEnabled === false

                        break;
                    }
            };
        }); 
        collector.on('end', () => embedMessage.delete());
    })
      isEnabled = true
      bot.on('message', message => {
        function contact() {
          if (isEnabled === false) return
          if (message.author.id === bot.user.id) return
          if (message.content.startsWith('cencel')) {
            message.channel.send(`Vous avez annulé la demande d'assistance en direct.`)
            if (message.channel.id === chan.id)
              bot.channels.get(CanalDeSoutien).send({embed: {
   color: 1127128,
  description: `La demande d'assistance en direct a été annulée par l'utilisateur.`}})
            if (message.channel.id === CanalDeSoutien)
              chan.send(`Votre demande d'assistance en direct a été annulée par l'autorité.`)
            return isEnabled = false
          }
          if (message.channel.id === chan.id)
            bot.channels.get(CanalDeSoutien).send(`${message.author.tag} : ${message.content}`)
          if (message.channel.id === CanalDeSoutien)
            chan.send(`${message.content}`)
        }
        contact(bot)
      })
    }
  })
}

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sed'
}