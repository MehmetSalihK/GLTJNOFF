const Discord = require('discord.js');

exports.run = (bot, message, args) => {
 {
            message.channel.send({embed: {
              
              color: 0x0099ff,
              description : `**Vous avez invité le bot <@${bot.user.id}>.**`,
	author: {
		name: `Gilet Jaune`,
		icon_url: bot.user.avatarURL,
		url: 'https://discordapp.com/oauth2/authorize?client_id=641063714757410817&permissions=1379400787&scope=bot',
	},
	fields: [
		{
			name: `Pour qu'il fonctionne correctement, vous devez écrire`,
			value: `\`-setprefix (votre prefix)\``,
      "url": "https://i.imgur.com/ZGPxFN2.jpg",
		},
		{
			name: '\u200b',
			value: '\u200b',
		},
	],
	image: {
		url: 'https://i.imgur.com/ltwHTUo.gif',
	},

            
            
            }})
   message.channel.send({embed: {
     description: `Après l'avoir écrit ce commande vous pouvez écrire \`-aide\` pour que le bot dise ses commandes.`,
        fields: [
		{
			name: '\u200b',
			value: '\u200b',
		},
	],
                "image": {
                "url": "https://i.imgur.com/GzRddON.gif",
                }
        }
            });
        }
};


exports.help = {
  name: 'önemli',
  description: 'İstediğiniz şeyi bota duyurtur.',
  usage: 'dmduyuru [duyurmak istediğiniz şey]'
};