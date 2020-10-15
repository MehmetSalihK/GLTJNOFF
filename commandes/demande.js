const Discord = require('discord.js');

exports.run = (bot, message, args, ops) => {
  let soru = args.join(" ")
  if (!soru) return message.channel.send('Bana bir soru sormalısın?')

const cleverbot = require('cleverbot.io')
var zeki = new cleverbot('1H1yLvOYzYpGIHnA','oKIpHZmA5xqrfOkFuHdSX22hwvK6J7F7');

zeki.setNick(`${bot.user.username}`)
zeki.create(function(err, session) {
message.channel.send(`Cevap yükleniyor...`).then(msg => {
zeki.ask(soru, function(err, response) {
msg.edit(response)
})
})
})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s', 'konu�', 'sohbet', 'ask',],
  permLevel: 0
};

exports.help = {
  name: 'sor',
  description: 'Soru sormaya yarar.',
  usage: 'sor <soru>'
};