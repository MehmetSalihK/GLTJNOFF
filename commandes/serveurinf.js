const Discord = require("discord.js");
const bot = new Discord.Client();

function botUptime(){
	var uptimeSeconds = 0, uptimeMinutes = 0, uptimeHours = 0, uptimeDays = 0;

	uptimeSeconds = Math.floor(bot.uptime/1000);

	if(uptimeSeconds > 60){
		uptimeMinutes = Math.floor(uptimeSeconds/60);
		uptimeSeconds = Math.floor(uptimeSeconds % 60);
	}

	if(uptimeMinutes > 60){
		uptimeHours = Math.floor(uptimeMinutes / 60);
		uptimeMinutes = Math.floor(uptimeMinutes % 60);
	}

	if(uptimeHours > 24){
		uptimeDays = Math.floor(uptimeHours / 24);
		uptimeHours = Math.floor(uptimeHours % 24);
	}

	return [uptimeDays, uptimeHours, uptimeMinutes, uptimeSeconds];
}

module.exports.run = async (bot, message, args) => {
  const users = bot.users.array();
  		const guildMembers = message.guild.members.array();
  		const channels = bot.channels.array();

  		var guildTotalOnline = 0;
  		var totalOnline = 0;
  		var totalTextChannels = 0;
  		var totalVoiceChannels = 0;
  		var uptime = botUptime();

  		for(var i = 0; i < guildMembers.length; i++){
  			if(guildMembers[i].presence.status === 'online'){
  				guildTotalOnline++;
  			}
  		}

  		for(var i = 0; i < users.length; i++){
  			if(users[i].presence.status === 'online'){
  				totalOnline++;
  			}
  		}
  		var nonGuildChannels = 0;
  		for(var i = 0; i < channels.length; i++){
  			if(channels[i].type === 'text')
  				totalTextChannels++
  			else if(channels[i].type === 'voice')
  				totalVoiceChannels++
  			else
  				nonGuildChannels++
  		}
  var sicon = message.guild.iconURL;
  var online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
  message.channel.send("**Serveur Info**",{
    color: 3447003,
    author: {
      name: message.guild.name,
      icon_url: sicon
    },
    fields: [{
      name: "Membres",
	  					value: "`" + bot.users.size + "` au total\n`" + `<a:Online:641302547000328202>` + totalOnline + "` En ligne\n\n`" + message.guild.memberCount + "` au total ce serveur\n`" + guildTotalOnline + "` en ligne ce serveur",
	  					inline: true
	  				}, {
        name: "**Information du serveur**",
        value: `Propriétaire du serveur = ${message.guild.owner}\`${message.guild.owner.id}\` \nNom du serveur = \`${message.guild.name}\` \nZone Serveur = \`${[message.guild.region]}\` \nCanal du serveur = \`${message.guild.channels.size}\` \nMembres = \`${message.guild.memberCount}\` \nPersonnes = \`${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}\` \nBot = \`${message.guild.members.filter(m => m.user.bot).size}\` \n<a:Online:641302547000328202>En Ligne = \`${online.size}\` \nRôles de serveur = \`${message.guild.roles.size}\` `,
      inline: true
      },
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: `Pour de l'aide [${message.prefix}aide]`
    }
  }
);
  const embed = new Discord.RichEmbed()
  .setColor("#00eaff")
  .setAuthor("Serveur Emojis")
  .setDescription(`${message.guild.emojis.map(e=>e.toString()).join(" **|** ") || message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n')}\n`)
  return message.channel.send(embed)
};

exports.help = {
  name: 'serveurinfo'
};