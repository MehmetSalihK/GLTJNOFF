const Discord = require('discord.js');
const request = require('request');
module.exports.run = async (bot, message, args) => {
  let tag = args[0];
  if(!tag)
    {
      message.channel.send("Lütfen bir kullanıcı ismi giriniz.")
    }
  else
    {
      request(`http://acarsy.glitch.me/api/twitter?ara=${tag}`, async function(error, response, body) {
        let bod = JSON.parse(body)
        if(bod.kod !== 200)
          {
            message.channel.send("Böyle bir hesap bulunmamakta!")
          } else
            {
              if(bod.sonTweet !== null)
                {
                  let embed = new Discord.RichEmbed()
                  .setTitle(`${tag} adlı kullanıcının Twitter profili!`)
                  .setThumbnail(bod.profilResmi)
                  .setColor("#1da1f2")
                  .addField(`Görünen isim`, `${bod.görünenİsim}`)
                  .addField(`Kapak resmi`, `${bod.kapakResmi === null ? "Yok." : bod.kapakResmi}`)
                  .addField(`Gizli mı?`, `${bod.gizliMi ? "Evet" : "Hayır"}`)
                  .addField(`Onaylı mi?`, `${bod.onaylıMı ? "Evet" : "Hayır"}`)
                  .addField(`Doğum Tarihi`, `${bod.doğumTarihi === null ? "Yok." : bod.doğumTarihi.türkçeTarih}`)
                  .addField(`Site`, `${bod.site === null ? "Yok." : bod.site.tam}`)
                  .addField(`Takipçi`, `${bod.takipEdenler === 0 ? "Kimse takip etmiyor" : bod.takipEdenler}`)
                  .addField(`Takip ettiği`, `${bod.takipEdilenler === 0 ? "Kimseyi takip etmiyor." : bod.takipEdilenler}`)
                  .addField(`Beğeni sayısı`, `${bod.beğeniSayısı === 0 ? "Hiç bir tweet'i beğenmemiş." : bod.beğeniSayısı}`)
                  .addField(`Tweet sayısı`, `${bod.tweetSayısı == 0 ? "Yok." : bod.tweetSayısı}`)
                  .addField(`Sabitlenen Tweet`, `${bod.sabitlenenTweet == null ? "Yok." : bod.sabitlenenTweet.tweet}`)
                  .addField(`Son Tweet`, `${bod.sonTweet.tweet == null ? "Yok." : bod.sonTweet.tweet}`)
                  .addField(`Son Tweet tarihi`, `${bod.sonTweet.tweetTarihi.türkçeTarih === null ? "Yok." : bod.sonTweet.tweetTarihi.türkçeTarih}`)
                  .addField(`Ne zaman katılmış?`, `${bod.katılmaTarihi.türkçeTarih}`)
                  .setFooter(`${bod.biyografi === null ? "Biyografisi bulunmuyor." : bod.biyografi}`)
                  message.channel.send(embed)
                } else
                  {
                    message.channel.send("Bu hesabın bir son tweet'i bulunmuyor.")
                  }
            }
        })
    }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'twitter',
  description: '',
  usage: ''
};