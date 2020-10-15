let express = require("express"),
    http = require('http'),
    app = express();

app.use(express.static("public"));
app.get("/", function(request, response) {
  response.sendStatus(200); // Status: OK
});

let listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// You don't need to fill anything on process.env.PROJECT_DOMAIN or process.env.PORT.
// It's default from glitch.com.
// Restart the bot and wait until 5 minutes forward.


app.get("/", (request, response) => {
  console.log(`Il ne faisait pas de cliquetis en ce moment. Alors ça n'a pas été pongé ....`);
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`https://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Discord = require('discord.js')
const fs = require("fs");
const moment = require('moment');
const paramètres = require('./paramètres.json');
const musique = require('./radio.youtube.js');
//const musique2 = require('./radio.youtube2.js');
//const deneme = require('./radio.youtube1.js');
//const channelchanger = require('./channelchanger.js');
const reactjeux = require('./reactjeux.js');
const YoutubeNoti = require('./YoutubeNoti.js');
const radio = require('./radio/radio.js');
const spam = require('./spam.js');
//const AutoMessage = require('./am.js');


const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client();

/* bot.on('ready', function () {
  console.log("Je suis connecté !")
}) */

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on ("ready",fonction => {
  console.log('I am ready!');
//YOU CAN CHANGE THE STATUT ("dnd") BY
//online - user is online
//offline - user is offline or invisible
//idle - user is AFK
//dnd - user is in Do not Disturb
  bot.user.setStatus("idle");
  bot.user.setActivity("#RestezChezVous!");
      return (console.error);
  });

/* bot.on("ready", async ()  => {

        bot.user.setGame("#RestezChezVous!");
}); */

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("message", async message => {
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;
  
  
  if (message.content.toLowerCase() === 'prefix') {
    let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
let prefix = prefixes[message.guild.id].prefixes;
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Gilet Jaune")
    .addField("Prefix", `\`${prefix}\``, true)
    .addField("Help", `\`${prefix}help\``, true)
    .setThumbnail(bot.user.displayAvatarURL)
    message.channel.send({embed});
	}
  
  if(message.content.startsWith(`${prefix}coloré`)) {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return  message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
          message.channel.send({embed: {
   color: 1127128,
  description: `utilisation: \`${prefix}coloré <@role>\``
}});
            for(var role of message.mentions.roles.array()) {
              message.channel.send({embed: {
   color: 1127128,
  description: `${role} ajouté à la liste des rôles arc-en-ciel. `
}});
                
                this.addRainbowRole(message.guild.id, role.id);
            }
        }
  
  if (message.content === `${prefix}entrée`) {
		bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
	}
  
  if (message.content === `${prefix}sortie`) {
        bot.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }    
  
  
  if (message.content.toLowerCase() == `${prefix}vocalon`){
        message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return  message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
				if(message.member.hasPermission("MANAGE_CHANNELS")){
					if (message.member.voiceChannel){
						var voiceChannel=message.member.voiceChannel;
						if(voiceChannel.manageable){
							if (!channels[voiceChannel.id]){
								channels[voiceChannel.id]=[voiceChannel.name, 0.5, "X - Y"];
								autosave()
                message.channel.send({embed: {color: 1127128,description: `<a:Valider:641302704181870592> | \`${voiceChannel.name}\` a bien été ajouté à ma liste.`}});
								scanOne(voiceChannel)
							}else{
                message.channel.send({embed: {color: 1127128,description: `<a:loading:639313015774380033> | \`${channels[voiceChannel.id][0]}\` est déjà sur ma liste.`}});
							}
						}else{
							message.reply("I need `manage_channels` permission to do this.")
						}
					}else{
						message.channel.send({embed: {color: 1127128,description: `🔊 | Vous devez être sur le canal audio pour utiliser cette commande.`}});
					}
				}else{
					message.reply({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}})
				}
			}else if (message.content.toLowerCase() == `${prefix}vocaloff`){
        message.delete()
        if(!message.member.hasPermission("ADMINISTRATOR")) return  message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
				if(message.member.hasPermission("MANAGE_CHANNELS")){
					if (message.member.voiceChannel){
						var voiceChannel=message.member.voiceChannel;
						if (channels[voiceChannel.id]){
							if(voiceChannel.manageable){
								voiceChannel.setName(channels[voiceChannel.id][0])
							}
							delete channels[voiceChannel.id];
							autosave();
              message.channel.send({embed: {color: 1127128,description: `<a:Valider:641302704181870592> | \`${voiceChannel.name}\` a bien été supprimé de ma liste.`}});
						}else{
              message.channel.send({embed: {color: 1127128,description: `<a:loading:639313015774380033> | Pas sur ma liste \`${voiceChannel.name}\``}});
						}
					}else{
            message.channel.send({embed: {color: 1127128,description: `🔊 | Vous devez être sur le canal audio pour utiliser cette commande.`}});
					}
				}else{
					message.reply({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
				}
			}else if (message.content.toLowerCase()===`${prefix}vocal`){
        message.delete()
        const embed = new Discord.RichEmbed()
                .setColor(3447003)
                .addField("Commande de changement de canal", `\`${prefix}vocalon\` Ajoute votre canal audio à renommer.
\`${prefix}vocaloff\` Votre chaîne audio va être supprimée de la liste.`)
                .setFooter(`Pour de l'aide [${message.prefix}aide]`, bot.user.avatarURL)

            message.channel.sendEmbed(embed)
      }
  
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return;

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix; 
  
  //--Admin
  try {
	let commandFile = require(`./admin/${cmd}.js`);
	commandFile.run(bot, message, args);
    
	if(!commandFile) return message.channel.send("Tritax AI Error: No Command found with that name.");
  
  console.log(`[${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
	} catch (err) {
    console.log(`Tritax AI Error: I found an Error while Loading my Commands!\n${err.stack}`);
  }
  //--Commandes
  try {
	let commandFile = require(`./commandes/${cmd}.js`);
	commandFile.run(bot, message, args);
    
	if(!commandFile) return message.channel.send("Tritax AI Error: No Command found with that name.");
  
  console.log(`[${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
	} catch (err) {
    console.log(`Tritax AI Error: I found an Error while Loading my Commands!\n${err.stack}`);
  }
  //--amusement
  try {
	let commandFile = require(`./amusement/${cmd}.js`);
	commandFile.run(bot, message, args);
    
	if(!commandFile) return message.channel.send("Tritax AI Error: No Command found with that name.");
  
  console.log(`[${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
	} catch (err) {
    console.log(`Tritax AI Error: I found an Error while Loading my Commands!\n${err.stack}`);
  }
  
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on('guildCreate', (guild) => {
    let channel = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(bot.user.id)).has('SEND_MESSAGES'));
    if (channel.size > 0) channel.first().send({embed: {
              
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
			value: `[\`-setprefix (votre prefix)\`](https://i.imgur.com/ltwHTUo.gif)`,
      "url": "https://i.imgur.com/ltwHTUo.gif",
		},
    {
			name: `Après l'avoir écrit ce commande, vous pouvez regarder les commandes du bot en écrivant`,
			value: `[\`-aide\`](https://i.imgur.com/GzRddON.gif)`,
      url: "https://i.imgur.com/GzRddON.gif"
		},
		{
			name: '\u200b',
			value: '\u200b',
		},
	],
	image: {
		url: 'https://i.imgur.com/ltwHTUo.gif',
	},
      description: `Vous pouvez également nous contacter en envoyant des problèmes de FAQ. <@428233517483425793> (MehmetSalihK#2191)`,
                "image": {
                "url": "https://i.imgur.com/GzRddON.gif",
                "url": "https://i.imgur.com/ltwHTUo.gif",
                }
        }
            })
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const Canvas = require('canvas');
const snekfetch = require('snekfetch');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

bot.on("message", async message => {
    let mètre = JSON.parse(fs.readFileSync("./paramètres/mètre.json", "utf8"));
    if(mètre[message.guild.id]) {
        if(mètre[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Félicitations, nous avons atteint avec succès ${mètre[message.guild.id].sayi} utilisateurs!`)
                .setColor("0x808080")
                .setTimestamp()
            message.channel.send({embed})
            delete mètre[message.guild.id].sayi;
            delete mètre[message.guild.id];
            fs.writeFile("./paramètres/mètre.json", JSON.stringify(mètre), (err) => {
                console.log(err)
            })
        }
    }
})
bot.on("guildMemberRemove", async (member, message) => {
  
        let mètre = JSON.parse(fs.readFileSync("./paramètres/mètre.json", "utf8"));
  let dedansetdehors = JSON.parse(fs.readFileSync("./paramètres/mètre.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", bot.user.avatarURL);
 
  if (!dedansetdehors[member.guild.id].canal) {
    return;
  }
 
  try {
    let canaldentréeID = dedansetdehors[member.guild.id].canal;
    let canaldentrée = bot.guilds.get(member.guild.id).channels.get(canaldentréeID);
    
   const embedv11 = new Discord.RichEmbed()
    .setColor('PURPLE')
    .setFooter(``)
    .setTimestamp()
    .addField('**Nous a laissé!**',`>  <a:megaz:641302524430778424> <a:Quitter:641302704559489081> ${member.user.tag}, a quitter, Il reste \**${mètre[member.guild.id].sayi - member.guild.memberCount}\** personnes sur \**${mètre[member.guild.id].sayi}\**!`)
    
    canaldentrée.send(embedv11);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }//627222620080701449
 
});//626826943375081513
bot.on("guildMemberAdd", async (member, message) => {
        let mètre = JSON.parse(fs.readFileSync("./paramètres/mètre.json", "utf8"));
  let dedansetdehors = JSON.parse(fs.readFileSync("./paramètres/mètre.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", bot.user.avatarURL);
 
  if (!dedansetdehors[member.guild.id].canal) {
    return;
  }
 
  try {
    let canaldentréeID = dedansetdehors[member.guild.id].canal;
    let canaldentrée = bot.guilds.get(member.guild.id).channels.get(canaldentréeID);
    const embedv11 = new Discord.RichEmbed()
    .setColor('PURPLE')
    .setFooter(``)
    .setTimestamp()
    .addField('**Nous a rejoint!**',`> <a:megaz:641302524430778424> <a:Enter:641302704072818698> ${member.user.tag}, nous a rejoint, Il reste \**${mètre[member.guild.id].sayi - member.guild.memberCount}\** personnes sur \**${mètre[member.guild.id].sayi}\**!`)
    
    canaldentrée.send(embedv11);
    
    const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://cdn.glitch.com/88535ec8-18b1-4666-8b6e-77042142324c%2Fwelcome-f.png?v=1570787519335.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Assign the decided font to the canvas
	ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(member.displayName, canvas.width / 1.0, canvas.height / 1.0);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	canaldentrée.send(``, attachment);   
     } catch (e) {
    return console.log(e)
  }
    
 
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const jsonfile = require('jsonfile');
var channels=require("./paramètres/channels.json");
var noFlyList=[undefined,"Spotify"]; // dont set the channel name to these
var changes=false; //whether or not there have been unsaved changes made to the database

bot.on('ready', () => {
	console.log('Logged in as '+bot.user.username);
	// Log some statistics
	console.log("Guilds: "+bot.guilds.size);
	console.log("Channels in database: "+Object.keys(channels).length); // count managed channels
	if(process.argv[2]==="prune"){
		var deleted=0;
		console.log("Pruning database...");
		for(var channel in channels){
			if(!bot.channels.get(channel)){
				delete channels[channel];
				deleted++;
				autosave();
			}
		}
		console.log("Deleted "+deleted+" channels.");
	}
});

/**
* Called when changes are made to the database.
* Instead of saving immediately every time changes are made,
* this function limits the saves to every 30000ms.
*/
function autosave() {
	if(!changes){
		setTimeout(save,30000);
		changes=true;
	}
}
/**
* Saves the database. See autosave().
*/
function save(){
	console.log("Auto-saving Database..");
	jsonfile.writeFile("./paramètres/channels.json", channels, function (err) {
		if (err){
			console.log(err);
		}
	})
	changes=false;
	console.log("Autosave Complete");
}

/**
* Determines what most people in the vc are playing
* @param channel the voice channel to calculate the majority game in
* @param majorityPercent the `!majority` value for the channel, as a decimal
* @return The title of the majority game
*/
function majority(channel,majorityPercent){
	var games = {}; // title : count
	var majorityName=""; // after sorting, this is the most played game title
	var majorityNumber=0; // after sorting, this is how many users are playing it
	var userCount=0; // Number of non-bot users
	channel.members.forEach(function(member){
		if(!member.user.bot){ // ignore bots
			userCount++;
			if(member.presence.game){
				games[member.presence.game.name]=((games[member.presence.game.name] || 0) + 1);
				if(games[member.presence.game.name]>majorityNumber){
					majorityName=member.presence.game.name;
					majorityNumber=games[member.presence.game.name];
				}
			}
		}
	})
	if((majorityNumber / userCount) > majorityPercent){ // if we have a majority over the threshold
		return(majorityName);
	}else{
		return;
	}
}
/**Checks and sets the name of a voice channel.
* @param channel the voice channel in question.
*/
function scanOne(channel){
	var channelConfig=channels[channel.id]; // channel settings
	if(channel){
		if(channel.manageable){ //if the bot has permission to change the name
			var newTitle=channelConfig[0];
			if(channel.members.size>0){ // if anyone is in the channel
				var gameTitle=majority(channel, channelConfig[1] || 0.5);
				if(!noFlyList.includes(gameTitle)){
					if(channelConfig[2]){ //Template setting
						newTitle=(channelConfig[2].replace(/X/,channelConfig[0]).replace(/Y/,gameTitle));
					}else{ // use default
						newTitle=(channelConfig[0] + " - " + gameTitle);
					}
				}
			}
			if(channel.name!==newTitle){
				channel.setName(newTitle);
			}
		}
	}else{
		delete channels[channel.id];
		console.log("Found deleted channel");
		autosave();
	}
}
//update affected channels when someone leaves or joins
bot.on('voiceStateUpdate', (oldMember,newMember) => {
	if(oldMember.voiceChannel!==newMember.voiceChannel){ // dont respond to mute/deafen
		if (oldMember.voiceChannel){
			if (channels[oldMember.voiceChannelID]){
				scanOne(oldMember.voiceChannel);
			}
		}
		if (newMember.voiceChannel){
			if (channels[newMember.voiceChannelID]){
				scanOne(newMember.voiceChannel);
			}
		}
	}
});

bot.on('presenceUpdate', (oldMember,newMember) => {
	if(oldMember.presence.game!==newMember.presence.game){ // if its the game that changed
		if(newMember.voiceChannel){
			if(channels[newMember.voiceChannelID]){ // if their voice channel is managed by the bot
				scanOne(newMember.voiceChannel);
			}
		}
	}
});

bot.on("guildCreate", guild=>{
	console.log("Joined "+guild.name);
})

// I am a nihilist
process.on('unhandledRejection', function (err) {

});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const invites = {};
const wait = require('util').promisify(setTimeout);

bot.on('ready', () => {
  wait(1000);
  
  let myGuild = bot.guilds.get("639291443537641492");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("682572625041817608");
  memberCountChannel.setName("Membres: " + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));

bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
bot.on('guildMemberAdd', member => {
  let myGuild = bot.guilds.get("639291443537641492");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("682572625041817608");
  memberCountChannel.setName("Membres: " + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
  
let journalInvitation = JSON.parse(fs.readFileSync('./paramètres/journalinvitation.json', 'utf8'));
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = bot.users.get(invite.inviter.id);
const embed = new Discord.RichEmbed()
.setDescription(`${member.user.username} a rejoint le serveur! \n Invité par : \n<@${inviter.id}> \n Nombre de personnes utilisant l'invitation :\n \`\`${invite.uses}\`\` \n Code d'invitation : \n**${invite.code}** \n Lien d'invitation : \n https://discord.gg/${invite.code}`)
.setColor("RED")
.setThumbnail(member.user.avatarURL)

  member.guild.channels.find("id", journalInvitation[member.guild.id]).send({
    embed
  });
  })
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("guildMemberAdd", async member => {
        var sayac = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
  var autorole =  JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
      var arole = autorole[member.guild.id].sayi
  var giriscikis = JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));  
  var embed = new Discord.RichEmbed()
    .setTitle('Système Autorol')
    .setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag} une autorisation `)
.setColor("RANDOM")
    .setFooter(" ", bot.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    var giriscikiskanalID = giriscikis[member.guild.id].kanal;
    var giriscikiskanali = bot.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

bot.on("guildMemberAdd", async (member) => {
      var autorole =  JSON.parse(fs.readFileSync("./paramètres/autorole.json", "utf8"));
      var role = autorole[member.guild.id].sayi

      member.addRole(role)

});


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("message", async message => {   
  
  let lienObstacle = JSON.parse(fs.readFileSync("./paramètres/addBlock.json", "utf8"));
if (!lienObstacle[message.guild.id]) return;
if (lienObstacle[message.guild.id].lienObstacle === "ferme") return;
    if (lienObstacle[message.guild.id].lienObstacle === "ouvre") {
    var regex = new RegExp(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/)
    if (regex.test(message.content)== true) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
    if(!message.member.hasPermission("MANAGE_MESSAGES")) 
    if(!message.member.roles.some(role => role.name === 'EQUIPE! 👥')) {
      message.delete()
       message.channel.send(`<@${message.author.id}>`).then(message => message.delete(5000));
        var e = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor("🛑 Block Lien!")
        .addField(message.author, " essayant de faire de la publicité", true)
        .setDescription(`Les liens sur ce serveur sont bloqués par **${message.guild.owner}**! Je ne te laisserai pas faire des pubs.`)
        message.channel.send(e);
    }
}
    }
  
  let hereBlock = JSON.parse(fs.readFileSync("./paramètres/hereBlock.json", "utf8"));
  if (!message.guild) return;
  if (!hereBlock[message.guild.id]) return;
  if (hereBlock[message.guild.id].hereBlock === 'ferme') return;
    if (hereBlock[message.guild.id].hereBlock=== 'ouvre') {
      const here = ["@here", "@everyone"];
  if (here.some(word => message.content.toLowerCase().includes(word)) ) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
    if(!message.member.hasPermission("MANAGE_MESSAGES")) 
    if(!message.member.roles.some(role => role.name === 'EQUIPE! 👥')) {
      if(!message.member.roles.some(role => role.name === 'LIEN')) {
      message.delete()
       message.channel.send(`<@${message.author.id}>`).then(message => message.delete());
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("🛑 @Everyone et @Here bloque!")
        .setDescription(`@Everyone et @Here son interdits sur ce serveur!`)
        message.channel.send(e);
    }
  }
}
    }
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const db = require('quick.db');

bot.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("guildCreate", guild => {
  let log = bot.channels.get("663817049885376539");
  const embed = new Discord.RichEmbed()
    .setAuthor("J'ai été ajouté à un nouveau serveur!")
    .setThumbnail(
      guild.iconURL ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9J1LKrqyj9OhkVIqldc8cIjHbL7YpCaCx03L04NwadHxZgn8l"
    )
    .addField("Nom du serveur:", `**${guild.name}**`)
    .addField("ID du serveur:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Informations sur le serveur:",
      `**Propriétaire hôte: \`${guild.owner}\`\nZone Serveur: \`${guild.region}\`\nNombre de membres: \`${guild.members.size}\`\nNombre de canaux: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.avatarURL);
  log.send(embed);
});
bot.on("guildDelete", guild => {
  let log = bot.channels.get("663817049885376539");
  const embed = new Discord.RichEmbed()
    .setAuthor("J'ai été viré d'un serveur -_-")
    .setThumbnail(
      guild.iconURL ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9J1LKrqyj9OhkVIqldc8cIjHbL7YpCaCx03L04NwadHxZgn8l"
    )
    .addField("Nom du serveur:", `**${guild.name}**`)
    .addField("ID du serveur:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Informations sur le serveur:",
      `**Propriétaire hôte: \`${guild.owner}\`\nZone Serveur: \`${guild.region}\`\nNombre de membres: \`${guild.members.size}\`\nNombre de canaux: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.avatarURL);
  log.send(embed);
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${bot.user.username} Message privé!`)
         .setColor('RANDOM')
         .addField('Message de',` \`\`\` ${message.author.tag} \`\`\` `)
         .addField(`ID de l'expéditeur du message`, ` \`\`\`${message.author.id}\`\`\` `)
         .addField(`Message envoyé`, message.content)
         .setThumbnail(message.author.avatarURL) 
    bot.channels.get("663828828594110465").send(dmlog);
    }
});

bot.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`) 
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                   
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('$adis BOT  -|-  Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("$adis BOT Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author.tag}, Reklam Yapmak Yasak Lanet Zenci!`).then(msg => msg.delete(25000));
                  }             
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
  });

bot.on("message", async msg => {
let myGuild = bot.guilds.get("639291443537641492");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("682572625041817608");
  memberCountChannel.setName("Membres: " + memberCount)
  //.then(result => console.log(result))
  .catch(error => console.log(error));
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bot.login(paramètres.token);