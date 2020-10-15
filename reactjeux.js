const Discord = require('discord.js')
const fs = require("fs");
const paramètres = require('./paramètres.json');

const bot = new Discord.Client({disableEveryone: true});

bot.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
    if(message.author.bot)
    {
      if(message.embeds)
        {
          
          const embedMsg = message.embeds.find(msg => msg.description === `<:Homme:646131665399316488> <a:droite:641302495158599729> HOMME \n<:Femme:646131666519064616> <a:droite:641302495158599729> FEMME`);
          if(embedMsg)
            {
              message.react('646131665399316488')
              .then(reaction => reaction.message.react('646131665399316488'))
              .then(reaction => reaction.message.react('646131666519064616'))
              .then(msg => console.log('Deleted Msg'))
              .catch(err => console.error);
            }
        }
      return;
    }
  if (message.content.toLowerCase() === `${prefix}roles`){
    message.delete();
    {
      message.channel.send({embed: {
        
                "image": {
                "url": "https://imgur.com/YnvwFh8.gif",
                }
        }
            });
      message.channel.send({embed: {
    description: `<:Homme:646131665399316488> <a:droite:641302495158599729> HOMME \n<:Femme:646131666519064616> <a:droite:641302495158599729> FEMME`

    }
})
    }}
});


bot.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
    if(message.author.bot)
    {
      if(message.embeds)
        {
          
          const embedMsg = message.embeds.find(msg => msg.description === `<:Couple:646131667001540608> <a:droite:641302495158599729> COUPLE \n<:Celibataire:646131667051741208> <a:droite:641302495158599729> ÇELIBATAIRE`);
          if(embedMsg)
            {
              message.react('646131667001540608')
              .then(reaction => reaction.message.react('646131667001540608'))
              .then(reaction => reaction.message.react('646131667051741208'))
              .then(msg => console.log('Deleted Msg'))
              .catch(err => console.error);
            }
        }
      return;
    }
  if (message.content.toLowerCase() === `${prefix}roles`){
    message.delete();
    {
      message.channel.send({embed: {
        
                "image": {
                "url": "https://imgur.com/YnvwFh8.gif",
                }
        }
            });
      message.channel.send({embed: {
    description: `<:Couple:646131667001540608> <a:droite:641302495158599729> COUPLE \n<:Celibataire:646131667051741208> <a:droite:641302495158599729> ÇELIBATAIRE`

    }
})
      message.channel.send({embed: {
        
                "image": {
                "url": "https://imgur.com/YnvwFh8.gif",
                }
        }
            });
    }}
});

bot.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
    if(message.author.bot)
    {
      if(message.embeds)
        {
          
          const embedMsg = message.embeds.find(msg => msg.description ===  `<:13:646131658793418802> <a:droite:641302495158599729> 13+ \n<:15:646131663084060712> <a:droite:641302495158599729> 15+ \n<:18:646131666938757137> <a:droite:641302495158599729> 18+`);
          if(embedMsg)
            {
              message.react('646131658793418802')
              .then(reaction => reaction.message.react('646131658793418802'))
              .then(reaction => reaction.message.react('646131663084060712'))
              .then(reaction => reaction.message.react('646131666938757137'))
              .then(msg => console.log('Deleted Msg'))
              .catch(err => console.error);
            }
        }
      return;
    }
  if (message.content.toLowerCase() === `${prefix}roles`){
    message.delete();
    {
      message.channel.send({embed: {
    description: `<:13:646131658793418802> <a:droite:641302495158599729> 13+ \n<:15:646131663084060712> <a:droite:641302495158599729> 15+ \n<:18:646131666938757137> <a:droite:641302495158599729> 18+`

    }
})
      message.channel.send({embed: {
        
                "image": {
                "url": "https://imgur.com/YnvwFh8.gif",
                }
        }
            });
    }}
});

bot.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
    if(message.author.bot)
    {
      if(message.embeds)
        {
          
          const embedMsg = message.embeds.find(msg => msg.description === `<a:Jeux:646149272680529930> <a:droite:641302495158599729> GAMEUR/GAMEUSE`);
          if(embedMsg)
            {
              message.react('646149272680529930')
              .then(reaction => reaction.message.react('646149272680529930'))
              .then(msg => console.log('Deleted Msg'))
              .catch(err => console.error);
            }
        }
      return;
    }
  if (message.content.toLowerCase() === `${prefix}game`){
    message.delete();
    {
      message.channel.send({embed: {
    description: `<a:Jeux:646149272680529930> <a:droite:641302495158599729> GAMEUR/GAMEUSE`

    }
})
    }}
});

bot.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
    if(message.author.bot)
    {
      if(message.embeds)
        {
          
          const embedMsg = message.embeds.find(msg => msg.description === `<:GtaV:646379836205432843> <a:droite:641302495158599729> GRAND THEF AUTO 5 \n<:Csgo:646141954434007070> <a:droite:641302495158599729> COUNTER STIKE : GLOBAL OFFENSIVE \n<:Bo3:646141985178124341> <a:droite:641302495158599729> CALL OF DUTY : BLACK OPS III \n<:R6:646142102413246504> <a:droite:641302495158599729> RAINMBOW SIX SIÈGE \n<:Lol:646142149318017024> <a:droite:641302495158599729> LEAGUE OF LEGENDS \n<:Gmod:646142051301457930> <a:droite:641302495158599729> GARRY'S MOD \n<:Fifa:646368039398539284> <a:droite:641302495158599729> FIFA \n<:Fortnite:646368022704947230> <a:droite:641302495158599729> FORTNITE \n<:RockeatLeague:646370808012210176> <a:droite:641302495158599729> ROCKET LEAGUE \n<:Minecraft:646368900287823892> <a:droite:641302495158599729> MINECRAFT \n<:Ets2:646368088211587072> <a:droite:641302495158599729> EURO TRUCK SIMULATOR 2 \n<:Deceit:646142014894637076> <a:droite:641302495158599729> DECEIT`);
          if(embedMsg)
            {
              message.react('646379836205432843')
              .then(reaction => reaction.message.react('646379836205432843')) //-- GRAND THEF AUTO 5
              .then(reaction => reaction.message.react('646141954434007070')) //-- COUNTER STIKE : GLOBAL OFFENSIVE
              .then(reaction => reaction.message.react('646141985178124341')) //-- CALL OF DUTY : BLACK OPS III
              .then(reaction => reaction.message.react('646142102413246504')) //-- TOM CLANCY'S RAINMBOW SIX SIÈGE
              .then(reaction => reaction.message.react('646142149318017024')) //-- LEAGUE OF LEGENDS
              .then(reaction => reaction.message.react('646142051301457930')) //-- GARRY'S MOD
              .then(reaction => reaction.message.react('646368039398539284')) //-- FIFA
              .then(reaction => reaction.message.react('646368022704947230')) //-- FORTNITE
              .then(reaction => reaction.message.react('646370808012210176')) //-- ROCKET LEAGUE
              .then(reaction => reaction.message.react('646368900287823892')) //-- MINECRAFT
              .then(reaction => reaction.message.react('646368088211587072')) //-- EURO TRUCK SIMULATOR 2
              .then(reaction => reaction.message.react('646142014894637076')) //-- DECEIT
              .then(msg => console.log('Deleted Msg'))
              .catch(err => console.error);
            }
        }
      return;
    }
  if (message.content.toLowerCase() === `${prefix}jv`){
    message.delete();
    {
      message.channel.send({embed: {
    description: `<:GtaV:646379836205432843> <a:droite:641302495158599729> GRAND THEF AUTO 5 \n<:Csgo:646141954434007070> <a:droite:641302495158599729> COUNTER STIKE : GLOBAL OFFENSIVE \n<:Bo3:646141985178124341> <a:droite:641302495158599729> CALL OF DUTY : BLACK OPS III \n<:R6:646142102413246504> <a:droite:641302495158599729> RAINMBOW SIX SIÈGE \n<:Lol:646142149318017024> <a:droite:641302495158599729> LEAGUE OF LEGENDS \n<:Gmod:646142051301457930> <a:droite:641302495158599729> GARRY'S MOD \n<:Fifa:646368039398539284> <a:droite:641302495158599729> FIFA \n<:Fortnite:646368022704947230> <a:droite:641302495158599729> FORTNITE \n<:RockeatLeague:646370808012210176> <a:droite:641302495158599729> ROCKET LEAGUE \n<:Minecraft:646368900287823892> <a:droite:641302495158599729> MINECRAFT \n<:Ets2:646368088211587072> <a:droite:641302495158599729> EURO TRUCK SIMULATOR 2 \n<:Deceit:646142014894637076> <a:droite:641302495158599729> DECEIT`

    }
})
    }}
});

bot.on('messageReactionAdd', (reaction, user) => {
  if(user.bot)
    return;
  
  var roleName = reaction.emoji.name;
  var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  var member = reaction.message.guild.members.find(member => member.id === user.id);
  
  

    {
      member.removeRole(role).then(member => {
        console.log(member.user.username + " " + role.name + " rolu cikardi!");
      })
    }
  member.addRole(role).then(member => {
    console.log(member.user.username + " " + role.name +  ' rolu aldi!');
  }).catch(err => console.eroor);
});

bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
          var roleName = msg.emoji.name;
            var role = msg.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});

bot.login(paramètres.token);