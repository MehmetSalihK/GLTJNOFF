const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
  const users = bot.users.array();
  		const guildMembers = message.guild.members.array();
  		const channels = bot.channels.array();

  		var guildTotalOnline = 0;
  		var totalOnline = 0;
      var totalOffline = 0;
  var totalIdle = 0;
  var totalDnd = 0;
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
  
  for(var i = 0; i < users.length; i++){
  			if(users[i].presence.status === 'offline'){
  				totalOffline++;
  			}
  		}
  
  for(var i = 0; i < users.length; i++){
  			if(users[i].presence.status === 'idle'){
  				totalIdle++;
  			}
  		}
  
  for(var i = 0; i < users.length; i++){
  			if(users[i].presence.status === 'dnd'){
  				totalDnd++;
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
  var uptime = botUptime();
  		var d = uptime[0], h = uptime[1], m = uptime[2], s = uptime[3];
  message.channel.send("**Information du serveur**",{
	  			embed: {
	  				author: {
				      name: message.guild.name,
              icon_url: sicon,
				    },
	  				color: 1752220,
	  				fields: [{
	  					name: "Propriétaire du serveur",
	  					value: `${message.guild.owner}\`${message.guild.owner.id}\``,
	  				}, {
	  					name: "Nom du serveur",
	  					value: `\`${message.guild.name}\``,
               inline: true
	  				}, {
	  					name: "Zone Serveur",
	  					value: `\`${[message.guild.region]}\``,
	  				}, /* {
              name: "Propriétaire du serveur",
	  					value: "<a:Online:641302547000328202>`" + totalOnline + "` <a:Idle:641302478641430528>`" + totalIdle + "` <a:Offline:641302544865558538>`" + totalOffline + "`  <a:Oflline:641302478641430528>`" ,
	  				},*/ {
	  					name: "Membres",
              //
	  					value: "`" + (message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size) + "`" + " personnes\n" + "`" + (message.guild.members.filter(m => m.user.bot).size) + "` bot\n`" + bot.users.size + "` au total\n <a:Online:641302547000328202>`" + totalOnline + "` En ligne\n\n`" + totalOffline + "` hors ligne\n\n`" + message.guild.memberCount + "` au total ce serveur\n`" + guildTotalOnline + "` en ligne sur ce serveur",
	  					inline: true
	  				}, {
	  					name: "Channels",
	  					value: "`" + (bot.channels.size - nonGuildChannels)+ "` au total\n`" + message.guild.channels.size + "` ce serveur\n`" + totalTextChannels + "` 3 Total Text Channel\n`" + totalVoiceChannels + "` Total Voice Channel",
	  					inline: true
	  				}, {
	  					name: "Les serveurs",
	  					value: bot.guilds.size,
	  					inline: true
	  				}, {
	  					name: "la durée de fonctionnent",
	  					value: uptime[0] + "d " + uptime[1] + "h " + uptime[2] + "m " + uptime[3] + "s",
	  					inline: true
	  				}, {
	  					name: "Rôles de serveur",
	  					value: message.guild.roles.size,
	  					inline: true
	  				}],
	  				thumbnail: {
						url: bot.user.displayAvatarURL
					}
	  			}
	  		});
  const embed = new Discord.RichEmbed()
  .setColor("#00eaff")
  .setAuthor("Serveur Emojis")
  .setDescription(`${message.guild.emojis.map(e=>e.toString()).join(" **|** ") || message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n')}\n`)
  return message.channel.send(embed)
};

exports.help = {
  name: 'serveurinfo'
};