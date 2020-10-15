const express = require('express');
const { Client, RichEmbed } = require('discord.js');
const app = express();
    function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
const http = require('http');
app.get("/", (request, response) => {
  console.log(Date.now() + " ParisDekiBEBEG Youtube | Hostlandı");
  response.sendStatus(200);
});
const Discord = require('discord.js');
const client = new Discord.Client();
const data = new Map();

client.on('ready', () => {
        console.log(`${client.user.username} ismi ile giriş yapıldı! ${client.guilds.size} Sunucu, ${client.users.size} Kullanıcı.`);
});

client.on("message", async msg => {
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) {
    } else {
      if (msg.author.bot) {
      } else {
        let fyukas = await data.get(msg.author.id)
        
        if (fyukas === 1) {
        } else {
          await data.set(msg.author.id, 1)
          await sleep(1500)
          await
        msg.channel.send(new Discord.RichEmbed()
          .setDescription(`🇫🇷 **Ceci est un Message Automatique!** \n\nMerci de m’avoir contacté!\nMon ordinateur est mort subitement et je ne suis inclus que le 10/05/2020.\nEn raison de mon absence, je ne peux pas accéder au Discord pendant un certain temps.\nMais en cas d'urgence, mon collègue Monsieur <@214033624595431425> (KJN.YOGI#1838) prendra soin de vous.\nCordialement,\n\n<@428233517483425793> \n\n_____\n\n 🇹🇷 **Bu Otomatik Bir Mesajdır!** \n\nBenimle iletişime geçtiğiniz için teşekkür ederim!\nbilgisayarım aniden öldü ve 10/05/2020 tarihe kadar dahil değilim.\nYokluğumdan dolayı, bi süre discord'a erişemiyorum.\nAncak acil durumlarda meslektaşım Mösyö <@214033624595431425> (KJN.YOGI#1838) sizinle ilgilenecektir.\nSaygılarımızla,\n\n<@428233517483425793>`)
    //      .setAuthor(`🇫🇷 Ceci est un Message Automatique!`)
         .setThumbnail("https://cdn.glitch.com/d1f46aba-aced-4b1d-a8b1-2cdd9b15dbdd%2F20200419_231550.gif")
          .setColor(0x00AE86))
          await sleep(1500)
      }
      }
    }
  }
})

//--------------------------------------------------------------------------------------//
//4 https://discord.gg/FKVZ85K

client.on("guildCreate", fyukas => {
  sleep(1000);
  if (
    fyukas.id === "639291443537641492" ||  // j4j sunucusunun idsi
    fyukas.id === "639291443537641492"  // j4j sunucusunun idsi
  ) {
    
  } else {
    fyukas.leave();
  }
  });

//--------------------------------------------------------------------------------------//
//4 https://discord.gg/FKVZ85K

client.on("guildCreate", fyukas => {
  sleep(1000);
  if (
    fyukas.id === "656226913727283224" ||  // j4j sunucusunun idsi
    fyukas.id === "656226913727283224"  // j4j sunucusunun idsi
  ) {
    
  } else {
    fyukas.leave();
  }
  });

//--------------------------------------------------------------------------------------//
//4 https://discord.gg/FKVZ85K

client.on("guildCreate", fyukas => {
  sleep(1000);
  if (
    fyukas.id === "692845111452893204" ||  // j4j sunucusunun idsi
    fyukas.id === "692845111452893204"  // j4j sunucusunun idsi
  ) {
    
  } else {
    fyukas.leave();
  }
  });

//--------------------------------------------------------------------------------------//
//4 https://discord.gg/FKVZ85K

client.on("guildCreate", fyukas => {
  sleep(1000);
  if (
    fyukas.id === "690946371800268812" ||  // j4j sunucusunun idsi
    fyukas.id === "690946371800268812"  // j4j sunucusunun idsi
  ) {
    
  } else {
    fyukas.leave();
  }
  });

//--------------------------------------------------------------------------------------//
//4 https://discord.gg/FKVZ85K

client.on("guildCreate", fyukas => {
  sleep(1000);
  if (
    fyukas.id === "687645343126388751" ||  // j4j sunucusunun idsi
    fyukas.id === "687645343126388751"  // j4j sunucusunun idsi
  ) {
    
  } else {
    fyukas.leave();
  }
  });

//--------------------------------------------------------------------------------------//
//4 https://discord.gg/FKVZ85K

client.on("guildCreate", fyukas => {
  sleep(1000);
  if (
    fyukas.id === "688402019450748929" ||  // j4j sunucusunun idsi
    fyukas.id === "688402019450748929"  // j4j sunucusunun idsi
  ) {
    
  } else {
    fyukas.leave();
  }
  });

client.login("NDI4MjMzNTE3NDgzNDI1Nzkz.XpzojQ.7qGYd5j6FE0rZ7CtJKXN5nT_Cwk") // user tokeniniz
