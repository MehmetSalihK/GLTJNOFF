const Discord = require('discord.js')
const fs = require("fs");
const ms = require("parse-ms");
const moment = require('moment');
const paramètres = require('./paramètres.json');

const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client();



const { Client, Util } = require('discord.js');
const { token, YOUTUBE_API } = require('./paramètres.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const sql = require("sqlite");
sql.open("./guilds.sqlite");
sql.open("./time.sqlite");
var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
var myDate = date.substr(0, 10);

const ytdlDiscord = require('ytdl-core-discord');
const embed = new Discord.RichEmbed()
    .setColor('#808080');

const youtube = new YouTube(YOUTUBE_API);

const queue = new Map();

// client.on('warn', console.warn);

// client.on('error', console.error);

// client.on('ready', () => console.log('Yo this ready!'));

// client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

// client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async message => { // eslint-disable-line
  
  
  let prefixes = JSON.parse(fs.readFileSync("./paramètres/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: paramètres.prefix
    };
  };
	
  let prefix = prefixes[message.guild.id].prefixes;

	if (message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;

	const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);

	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

  if (command === 'chercher' || command === 'ch' || command === 'youtube' || command === 'yt' || command === 'search' || command === 'sc') {
    const voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) 
        {
            embed.setColor('#ff0000');
            embed.setDescription(`<:Erreur:641341672415821824> **| Vous devez d'abord vous connecter à un canal audio.**`);
            return message.channel.send(embed);
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT'))
        {
            embed.setColor('#ff0000');
            embed.setDescription(`<:Erreur:641341672415821824> **| Impossible de se connecter à votre canal vocal, assurez-vous que j'ai les autorisations appropriées!**`);
            return message.channel.send(embed);
        }
        if(!permissions.has('SPEAK'))
        {
            embed.setColor('#ff0000');
            embed.setDescription(`<:Erreur:641341672415821824> **| Impossible de parler dans ce canal vocal, assurez-vous que j'ai les autorisations appropriées!**`);
            return message.channel.send(embed);
        }
        
        if(serverQueue && !serverQueue.playing && !args[1]) 
        {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.react('▶');
        }
        
        if(serverQueue && serverQueue.playing && !args[1])
        {
            embed.setColor('#ff0000');
            embed.setDescription(`**${prefix}play <YouTube URL | Nom de la vidéo>**`);
            return message.channel.send(embed);
        }

        if(!args[1])
        {
            embed.setColor('#ff0000');
            embed.setDescription(`**${prefix}play <YouTube URL | Nom de la vidéo>**`);
            return message.channel.send(embed);
        }

        if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/))
        {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            let videonum = 0; 
            for(const video of videos)
            {
                try 
                {
                    ++videonum;
                    const video2 = await youtube.getVideoByID(video.id);
                    await handleVideo(video2, message, voiceChannel, true);    
                } 
                catch (error) 
                {
                    console.log(error);
                    videos.shift();
                }
            }
            embed.setColor('#808080');
            embed.setDescription(`✅ [${playlist.title}](${playlist.url}) - ${videonum} songs have been added to the queue!`);
            return message.channel.send(embed);
        }
        else
        {
            try 
            {
                var video = await youtube.getVideo(url);
            } 
            catch (error) 
            {
                try 
                {
                    var videos = await youtube.searchVideos(searchString, 1);
                    video = await youtube.getVideoByID(videos[0].id);
                } 
                catch (err) 
                {
                    console.error(err);
                    embed.setColor('#ff0000');
                    embed.setDescription(`**:( | J'ai chercher mais pas de résultat**`);
                    return message.channel.send(embed);
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
  } else if (command === 'jouer' || command === 'j' || command === 'play' || command === 'p') {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setTitle(`<:Erreur:641341672415821824> | Vous devez d'abord vous connecter à un canal audio.`));
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`<:Erreur:641341672415821824> | Vous devez d'abord vous connecter à un canal audio.`));
		}
		if (!permissions.has('SPEAK')) {
			 return message.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("<:Erreur:641341672415821824> | Impossible de démarrer la chanson. S'il vous plaît allumez mon microphone."));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return message.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**✅ | Playlist: **${playlist.title}** Ajouté à la file d'attente!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          message.delete();
          
				 message.channel.sendEmbed(new Discord.RichEmbed()                  
         .setAuthor('Gilet Jaune | Sélection de la chanson', `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`)
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Veuillez choisir un numéro entre 1 et 10 La liste sera annulée dans les 10 secondes.')
         .setColor('RANDOM')).then(d_msg => { d_msg.delete(10000); });
          message.delete();
					try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
            var olcum = await message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:loading:641302479497068555> | Sélection de votre chanson, Restez en attente...`)
      .setColor("GREEN")).then(msg => msg.delete(3000));
            var sonuc = await message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:valid:641302704181870592> | Votre chanson à été sélectionnée!`)
      .setColor("GREEN")).then(msg => msg.delete(2000));
					} catch (err) {
						console.error(err);
						 return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('<:Erreur:641341672415821824> | **Sélection annulée pour ne pas spécifier de valeur de morceau.**'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(":( | **J'ai chercher mais pas de résultat**"));
                }
            }
			return handleVideo(video, message, voiceChannel);
      
		}
    } else if (command === 'radiofr'|| command === 'rf' || command === 'radio'){
      const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) {
                const embed = new Discord.RichEmbed()
                    .setColor("#ff0000")
                    .addField('<:Erreur:641341672415821824>', "Vous devez être dans un canal vocal pour utiliser cette commande!")

                message.channel.sendEmbed(embed)
                return
            }
            if (!args[1]) {
                const embed = new Discord.RichEmbed()
                    .setColor("#ff0000")
                    .addField('<:Erreur:641341672415821824>', "Aucune radio n'a été sélectionnée!")

                message.channel.sendEmbed(embed)
                return
            }
            if (args[1] === "1") {
                const embed = new Discord.RichEmbed()
                    .setColor("#68ca55")
                .setAuthor("Radio Français", `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2FRadio.gif?1558729402131`)
                .setImage("https://www.zoneradio.fr/uploads/librairies/8c9dbbef59b1fd5dd24c1fb77ebb41ac.png")
                .addField('📻', 'SkyRockFM', true)
                .addField('<:headphones:567289278757994496>', message.member.voiceChannel, true)
                .setFooter(`Pour de l'aide [${prefix}aide]`, client.user.avatarURL)
                .setTimestamp()
                message.channel.send({embed})
                .then(async embedMessage => {
        await embedMessage.react('⏹')
        const emoji = {
            NEXT_PAGE: '⏹',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.NEXT_PAGE:
                    {
                        //Edit embed here (Next page)
                        message.member.voiceChannel.leave();
                        break;
                    }
            };reaction.remove(reaction.users.filter(u => u === message.author).first());
          message.delete()
          embed.delete();
        });
        collector.on('end', () => embedMessage.delete());
    })

                const member1 = message.guild.member(client.user);
                if (member1 && !member1.deaf) member1.setDeaf(true);
                message.member.voiceChannel.join().then(connection => {
                    require('http').get("http://icecast.skyrock.net/s/natio_mp3_128k", (res) => {
                        connection.playStream(res);
                    })
                })
                return
            }
      
      if (args[1] === "2") {
                const embed = new Discord.RichEmbed()
                    .setColor("#68ca55")
                .setAuthor("Radio Français", `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2FRadio.gif?1558729402131`)
                .setImage("https://ecouter.lesindesradios.fr/logos/orange8.png")
                .addField('📻', 'BeurFM', true)
                .addField('<:headphones:567289278757994496>', message.member.voiceChannel, true)
                .setFooter(`Pour de l'aide [${prefix}aide]`, client.user.avatarURL)
                .setTimestamp()
                message.channel.send({embed})
                .then(async embedMessage => {
        await embedMessage.react('⏹')
        const emoji = {
            NEXT_PAGE: '⏹',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.NEXT_PAGE:
                    {
                        //Edit embed here (Next page)
                        message.member.voiceChannel.leave();
                        break;
                    }
            };reaction.remove(reaction.users.filter(u => u === message.author).first());
          message.delete()
          embed.delete();
        });
        collector.on('end', () => embedMessage.delete());
    })

                const member1 = message.guild.member(client.user);
                if (member1 && !member1.deaf) member1.setDeaf(true);
                message.member.voiceChannel.join().then(connection => {
                    require('src').get("http://broadcast.infomaniak.ch/beurfm-high.mp3", (res) => {
                        connection.playStream(res);
                    })
                })
                return
            }
            const embed = new Discord.RichEmbed()
                .setColor("#ff0000")
                .addField('<:Erreur:641341672415821824>', "La radio n'existe pas")

           message.channel.sendEmbed(embed)        
    } else if (command === 'müziksd') {
		let tosend = ['```xl', tokens.prefix + 'gel : "Ses kanalına gelir"',	tokens.prefix + 'turkplay : "Youtube da şarkı aramak"',	tokens.prefix + 'turkradio : "Radyo çalar"',tokens.prefix + 'kuyruk : "Sıraya geçerli bir youtube bağlantısı ekle"', tokens.prefix + 'queue : "Mevcut kuyruğu, gösterilen 15 şarkıya kadar gösterir."', tokens.prefix + 'oynat : "Bir ses kanalına zaten katıldıysanız müzik kuyruğunu oynar"', '', 'Aşağıdaki komutlar sadece oynatma komutu çalışırken çalışır:'.toUpperCase(), tokens.prefix + 'durdur : "müziği duraklatır"',	tokens.prefix + 'devam : "müziği devam ettirir"', tokens.prefix + 'geç : "çalma şarkısını atlar"', tokens.prefix + 'time : "Şarkının çalma süresini gösterir."', tokens.prefix + 'volume : "tarafından ses artırır ve azaltır"',	'```'];
		message.channel.sendMessage(tosend.join('\n'));
		return undefined;		
  } else if (command === "radiolink") {
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) 
            if (!args[1]) 
            if (message.content.match(/http/i)) {
                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .addField('Succès!', "Maintenant, entrez la station de radio que vous avez entrée " + message.member.voiceChannel + "\nSi vous n'entendez rien après un moment, c'est peut-être parce que la connexion est invalide.")

                message.channel.sendEmbed(embed);
                const member1 = message.guild.member(client.user);
                if (member1 && !member1.deaf) member1.setDeaf(true);
                message.member.voiceChannel.join().then(connection => {
                    require('http').get(args[1], (res) => {
                        connection.playStream(res);
                    })
                })
                return
            }
            const embed = new Discord.RichEmbed()
                .setColor("#ff0000")
                .addField('<:Erreur:641341672415821824>', "L'URL que vous avais entrée, initialement ne contenait pas http!")

            message.channel.sendEmbed(embed)
            return
	} else if (command === 'suivant' || command === 'skip' || command === 's') {
		if (!message.member.voiceChannel) if (!message.member.voiceChannel) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`**<:Erreur:641341672415821824> | Veuillez vous connecter d'abord à un canal vocal.**`));
		if (!serverQueue) return message.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<a:frograinbow:488978511474982933> | **Pas de musique**'));                                              
		serverQueue.connection.dispatcher.end(`**J'ai passé la musique!**`);
		return undefined;
	} else if (command === 'ntm' || command === 'fuckoff' || command === 'stop' || command === 's' || command === 'leave' || command === 'l') {
    if (message.member.voiceChannel) {

                message.member.voiceChannel.leave();
                return
            }
		if (!message.member.voiceChannel) if (!message.member.voiceChannel) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`**<:Erreur:641341672415821824> | Veuillez vous connecter d'abord à un canal vocal.**`));
		if (!serverQueue) return message.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<:Erreur:641341672415821824> **| Pas de musique**'));                                              
		message.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Kapatıldı`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Musique Finit**');
		return undefined;
      } else if (command === 'volume' || command === 'v') {
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
            if (voiceConnection === null) {
                const embed = new Discord.RichEmbed()
                    .setColor("#ff0000")
                    .addField('<:Erreur:641341672415821824>', "Vous êtes pas actuellement dans un canal audio!")

                message.channel.sendEmbed(embed)
                return
            }

            // Get the dispatcher
            const dispatcher = voiceConnection.player.dispatcher;

            if (args[1] > 9999 || args[1] < 0) {
                const embed = new Discord.RichEmbed()
                    .setColor("#ff0000")
                    .addField('<:Erreur:641341672415821824>', "Son hors de portée! Doit être 0-9999!")

                message.channel.sendEmbed(embed)
                return
            }

            const embed = new Discord.RichEmbed()
                .setColor("#68ca55")
                .setAuthor(`Réglage du volume : ${args[1]} 🔨`, `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Fvolume.gif?1558732603252.gif`)

            message.channel.sendEmbed(embed);
            dispatcher.setVolume((args[1] / 100));
        
        
		if (!message.member.voiceChannel) if (!message.member.voiceChannel) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`<:Erreur:641341672415821824> **| Veuillez vous connecter d'abord à un canal vocal.**`));                        
	} else if (command === 'sonnerie') {
		if (!serverQueue) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:Erreur:641341672415821824> | **Pas de musique**")
    .setColor('RANDOM'));
		return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor("Gilet Jaune | Sonnerie", `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`)                            
    .addField('Titre', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Temps", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'shuffle') {
    if(serverQueue && serverQueue.playing) 
        {
            shuffle(serverQueue.songs);
            return message.react('🔀');
        }
        else
        {
            embed.setColor('#ff0000');
            embed.setDescription(`<:Erreur:641341672415821824> | Vous êtes pas actuellement dans un canal audio!`);
            return message.channel.send(embed);
        }
	} else if (command === 'replay' || command === 'rl' || command === 'rejouer' || command === 'rj') {
    if(serverQueue && serverQueue.playing) 
        {
            if(serverQueue.loop == true)
            {
                serverQueue.loop = false;
                message.react('🔁');
                return message.react('❌');
            }
            else
            {
                serverQueue.loop = true;
                message.react('🔁');
                return message.react('✅');
            }
        }
        else
        {
            embed.setColor('#ff0000');
            embed.setDescription('There is nothing currently playing.');
            return message.channel.send(embed);
        }

	} else if (command === 'rangée') {
    let index = 0;
		if (!serverQueue) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:Erreur:641341672415821824> | **Pas de musique en rangée**")
    .setColor('RANDOM'));
		  return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor('Gilet Jaune | Queue de chanson', `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`)
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('En train de jouer: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'pause' || command === 'ps') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.sendEmbed(new Discord.RichEmbed()
      .setAuthor("La musique s'est arrêtée pour vous!", 'https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Fpause-play.gif?1558730433546')
      .setColor('RANDOM'));
		} else if (command === 'replay') {
      async function play(guild, song, message) {
		const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ' :x:  | **Débit du flux pas assez.**') console.log('Musique fini.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setAuthor("Gilet Jaune | 🎙  Musique à commencée", "https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif")
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nTitre', `<a:8288_L_airpod:641302546845270016>[${song.title}](${song.url})<a:9466_R_airpod:641302546643943444>`, true)
  .addField("\nNiveau sonore", `${serverQueue.volume}%`, true)
  .addField("Temps", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'))
  .then(async embedMessage => {
        await embedMessage.react('⏸')
        await embedMessage.react('⏯')
        await embedMessage.react('⏹')
        const emoji = {
            PAUSE: '⏸',
            CONTINUE: '⏯',
            NTM: '⏹',
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.PAUSE:
                    {
                        if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
                        }
                        break;
                    }
                case emoji.CONTINUE:
                    {
                        if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
                        }
                        break;
                    }
                {

			serverQueue.connection.dispatcher.resume();

                       break;
                    }
                case emoji.NTM:
                    {

                if (message.member.voiceChannel) {

                message.member.voiceChannel.leave();
                return
            }
                      
                        break;
                    }
            };
        }); 
        collector.on('end', () => embedMessage.delete());
    })
}}
    } else if (command === 'listradio') {
      const embed = new Discord.RichEmbed()
                .setColor(3447003)
                .addField("Liste des stations de radio:", `\`${prefix}radiofr || ${prefix}rf || ${prefix}radio 1\` SkyRock
n\`\`${prefix}radiofr || ${prefix}rf || ${prefix}radio 2\` Beur
Demander l'ajout d'une station de radio avec la commande \`${prefix}demande\``)
                .setFooter(`Pour de l'aide [${prefix}aide]`, client.user.avatarURL)

            message.channel.sendEmbed(embed)
      return undefined;
		return message.channel.send('<:Erreur:641341672415821824> | **Pas de musique**');
      } else if (command === "demande") {
            sql.get(`SELECT * FROM time WHERE userId ="${message.author.id}"`).then(row => {
                if (row.date !== myDate) {
                    sql.run(`UPDATE time SET amount = 0 WHERE userId = ${message.author.id}`);
                    sql.run(`UPDATE time SET date = "0000-00-00" WHERE userId = ${message.author.id}`);
                }
                if (row.amount === 3) {
                    const embed = new Discord.RichEmbed()
                        .setColor("#ff0000")
                        .addField('Maximum journalier atteint!', "Vous avez utilisé les 3 suggestions quotidiennes de votre station. Veuillez attendre demain pour utiliser cette commande à nouveau.")
                        .setFooter(`La commande a été utilisée sur ${row.date}. Aujourd'hui est ${myDate}`)

                    message.channel.sendEmbed(embed)
                    return
                }
                if (!args.slice(1).join(" ")) {
                    const embed = new Discord.RichEmbed()
                        .setColor("#ff0000")
                        .addField('Message vide!', "Vous devez entrer une station de radio que vous souhaitez demander pour y être ajoutée! Vous ne pouvez pas le laisser en blanc.")

                    message.channel.sendEmbed(embed)
                    return
                }
                if (row.amount >= 0 && row.amount <= 10 && row.date === "0000-00-00") {
                    sql.run(`UPDATE time SET date = "${myDate}" WHERE userId = ${message.author.id}`);
                    sql.run(`UPDATE time SET amount = ${row.amount + 1} WHERE userId = ${message.author.id}`);
                    const embed = new Discord.RichEmbed()
                        .setColor("#68ca55")
                        .addField('Suggestion envoyée!', "Cette station de radio sera considérée.")
                        .setFooter(`Utilisé ${row.amount}/3 suggestions quotidiennes.`)

                    message.channel.sendEmbed(embed);
                    const embed1 = new Discord.RichEmbed()
                        .setTimestamp()
                        .setColor(3447003)
                        .addField('Nouveau feedback!', `${message.author.username}#${message.author.discriminator} bir öneri gönderdi!`)
                        .addField('Suggestion Radio:', `${args.slice(1).join(" ")}`)
                        .addField('Serveur:', `${message.guild.name} (${message.guild.id})`)
                        .setThumbnail(client.user.avatarURL)

                    client.channels.find("id", `567267970741698573`).sendEmbed(embed1)
                    return
                }
                if (row.amount >= 0 && row.amount <= 10) {
                    sql.run(`UPDATE time SET amount = ${row.amount + 1} WHERE userId = ${message.author.id}`);
                    const embed = new Discord.RichEmbed()
                        .setColor("#68ca55")
                        .addField('Suggestion envoyée!', "Cette station de radio sera considérée.")
                        .setFooter(`Utilisé ${row.amount}/3 suggestions quotidiennes.`)

                    message.channel.sendEmbed(embed);
                    const embed1 = new Discord.RichEmbed()
                        .setTimestamp()
                        .setColor(3447003)
                        .addField('Nouveau feedback!', `${message.author.username}#${message.author.discriminator} bir öneri gönderdi!`)
                        .addField('Suggestion Radio:', `${args.slice(1).join(" ")}`)
                        .addField('Serveur:', `${message.guild.name} (${message.guild.id})`)
                        .setThumbnail(client.user.avatarURL)

                    client.channels.find("id", `567267970741698573`).sendEmbed(embed1)
                    return
                }
            });
        } else if (command === 'musique') {
      if (args[1] === null || args[1] === "") {
                const embed = new Discord.RichEmbed()
                    .setColor(3447003)
                    .setThumbnail(client.user.avatarURL)
                    .addField('Commandes de musique:', '`1.` Commandes Youtube\n\
`2.` Commandes Radio\n`')
                message.channel.sendEmbed(embed)
                return
            }
            if (args[1] === "1") {
                const page1 = new Discord.RichEmbed()
                    .setColor(3447003)
                    .setFooter(`Pour de l'aide [${prefix}aide]`, client.user.avatarURL)
                    .addField("Commandes Youtube", `\`${prefix}vien || ${prefix}join || ${prefix}j\`: Canal sonore.
\`${prefix}jouer || ${prefix}j || ${prefix}youtube || ${prefix}yt || ${prefix}play || ${prefix}p\` Rechercher des chansons sur Youtube.
\`${prefix}kuyruk\` Ajoutez un lien YouTube valide à la file d'attente.

LES COMMANDES SUIVANTES NE FONCTIONNENT QUAND LORSQUE VOUS LANCEZ LA MUSIQUE:

\`${prefix}pause || ${prefix}ps\` met la musique en pause.
\`${prefix}continue || ${prefix}c || ${prefix}resume || ${prefix}r\` reprend la musique.
\`${prefix}suivant || ${prefix}skip || ${prefix}s\` passer en musique.
\`${prefix}sonnerie\` montrer la musique.
\`${prefix}ntm || ${prefix}fuckoff || ${prefix}stop || ${prefix}leave || ${prefix}l\` fermer la musique.
\`${prefix}volume || ${prefix}v <0-200>\` augmente et réduit le son.`)

                message.channel.sendEmbed(page1)
                return
            }
            if (args[1] === "2") {
                const page2 = new Discord.RichEmbed()
                    .setColor(3447003)
                    .setFooter(`Pour de l'aide [${prefix}aide]`, client.user.avatarURL)
                    .addField("Radyo komutları", `\`${prefix}listradio || ${prefix}rl\`: Afficher la liste des stations de radio.
\`${prefix}radiofr  || ${message.prefix}rf || ${prefix}radio\` Joueur radio.`)

                message.channel.sendEmbed(page2)
                return
            }
            const embed = new Discord.RichEmbed()
                .setColor(3447003)
                .setFooter(`Pour de l'aide [${prefix}aide] || ${prefix}müzik <nombre>`, client.user.avatarURL)
                .addField('Commandes de musique:', `\`1\` Commandes Youtube\n\
\`2\` Commandes Radio\n`)
                .setThumbnail(client.user.avatarURL)

            message.channel.sendEmbed(embed)
      return undefined;
	} else if (command === 'continue' || command === 'c' || command === 'resume' || command === 'r') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.sendEmbed(new Discord.RichEmbed()
      .setAuthor("La musique continue pour vous!", 'https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Fpause-play.gif?1558730433546')
      .setColor('RANDOM'));
		}
		return message.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<:Erreur:641341672415821824> ** | Pas de musique.**")
    .setColor('RANDOM'));
	} else if (command === 'vien' || command === 'v' || command === 'join'|| command === 'j') {
    const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`<:Erreur:641341672415821824> | Vous devez d'abord vous connecter à un canal audio.`));
		{
      if (!voiceChannel) return this.client.embed('noVoiceChannel', message);
       const permissions = voiceChannel.permissionsFor(message.guild.me).toArray();
    if (!permissions.includes('CONNECT')) return this.client.embed('noPerms-CONNECT', message);
    if (!permissions.includes('SPEAK')) return this.client.embed('noPerms-SPEAK', message);
    voiceChannel.join(); return message.channel.send({embed: {
   color: 1127128,
   description: `📍 ${message.member.voiceChannel} rejoint une salle de voix`
}});
		}
		}
  

	return undefined;
});






/* 
async function handleVideo(video, message, voiceChannel, playlist = false)
{
    const serverQueue = queue.get(message.guild.id);
    console.log(video);
    const song = 
    {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        requested: message.author,
        duration: video.duration,
      durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
      author: message.mentions.users.first() || message.author,
      user: message.author.username,
    };

    console.log(song.duration);

    if(!serverQueue)
    {
        const queueConstruct = 
        {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 1,
            volume2: [],
            playing: true,
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try
        {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } 
        catch(error)
        {
            embed.setColor('#ff0000');
            embed.setDescription(`Could not join the voice channel: ${error}`);
            console.error(`Could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(embed);
        }
    }
    else
    {
        if(!serverQueue.loop)
        {
            serverQueue.songs.push(song);
        }
        console.log(serverQueue.songs);
        if(playlist) 
        {
            return;
        }
        else 
        {
            embed.setColor('#808080');
            embed.setDescription(`✅ [${song.title}](${song.url}) has been added to the queue! [${song.requested}]`);
            return message.channel.send(embed);
        }
    }
    return;
}

async function play(guild, song, message)
{
    const serverQueue = queue.get(guild.id);

    if(!song)
    {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    console.log(serverQueue.songs);
let filter = m => m.author.id === message.author.id;
    const dispatcher = serverQueue.connection.playOpusStream(await ytdlDiscord(song.url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 }), { passes: 3, highWaterMark: 1, bitrate: 64000 })
    .on('end', reason => 
    {
        if(reason == 'Stream is not generating quickly enough.') 
        {
            dispatcher.end();
            console.log('Song ended!');
        }
        else 
        {
            console.log(reason);
        }
        if(serverQueue.loop && reason == 'Skip command used!')
        {
            serverQueue.loop = false;
            serverQueue.songs.shift();
        }
        else if(!serverQueue.loop)
        {
            serverQueue.songs.shift();
        }
        play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`<:youtube:641302526968201216>**YouTube**🔎 \`${song.title}\``);
    serverQueue.textChannel.send(new Discord.RichEmbed()
        .setAuthor("Gilet Jaune | 🎙  Musique à commencée", "https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif")
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nTitre', `<a:8288_L_airpod:641302546845270016>[${song.title}](${song.url})<a:9466_R_airpod:641302546643943444>`, true)
  .addField("\nNiveau sonore", `${serverQueue.volume}%`, true)
  .addField("Temps", `${song.durationm}:${song.durations}`, true)
  .setFooter(`Demandé par ${song.user}.`, ` `)
  .setColor('RANDOM'))    
  .then(async embedMessage => {
        await embedMessage.react('⏸')
        await embedMessage.react('▶️')
        await embedMessage.react('⏭')
        await embedMessage.react('⏹')
        await embedMessage.react('🗃️')
        await embedMessage.react('🔁')
        await embedMessage.react('🔊')
        const emoji = {
            PAUSE: '⏸',
            CONTINUE: '▶️',
             SUIVANT: '⏭',
            NTM: '⏹',
            QUEUE: '🗃️',
            REJOUER: '🔁',
          SON: '🔊',
          
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.PAUSE:
                    {
                        if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
                        }                 
                      
                        break;
                    }
                case emoji.CONTINUE:
                    {
                        if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
                        }
                        break;
                    }
                case emoji.SUIVANT:
                    {
                        if (!message.member.voiceChannel) if (!message.member.voiceChannel)
                        break;
                    }
                case emoji.NTM:
                    {

                if (message.bot.voiceChannel) {

                message.bot.voiceChannel.leave();
                return
            }
                      
                        break;
                    }
                case emoji.QUEUE:
                    {
let index = 0;
const queue = new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor('Gilet Jaune | Queue de chanson', `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`)
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`)
    .addField('En train de jouer: ' + `${serverQueue.songs[0].title}`);

                      serverQueue.textChannel.send(queue)
                        break;
                    }
                case emoji.REJOUER:
                    {

                if(serverQueue && serverQueue.playing) 
        {
            if(serverQueue.loop == true)
            {
                serverQueue.loop = false;
                embedMessage.react('❌');
                return embedMessage.react('❌');
            }
            else
            {
                serverQueue.loop = true;
                embedMessage.react('✅');
                return embedMessage.react('✅');
            }
        }
                      
                        break;
                    }
                case emoji.SON:
                    {
const son = new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor('Gilet Jaune | Queue de chanson', `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`)
    .setDescription(`testt son`)
  //⏬🔽🔼⏫
serverQueue.textChannel.send(son)
  .then(async embedMessage => {
        await embedMessage.react('⏬')
        await embedMessage.react('🔽')
        await embedMessage.react('🔼')
        await embedMessage.react('⏫') 
        const emoji = {
            PlusHuit: '⏬',
          /*  MoinDeux: '🔽',
             PlusDeux: '🔼',
            MoinHuit: '⏫', 
          
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.PlusHuit:
                    {
const embed = new Discord.RichEmbed()
                .setColor("#68ca55")
                .setAuthor(`z `, `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Fvolume.gif?1558732603252.gif`)

            serverQueue.textChannel.send(embed);
            dispatcher.setVolume((9999 / 100));
		// serverQueue.connection.dispatcher.setVolumeLogarithmic(9999 / 5);
       //               dispatcher.setVolume(9999 / 5);
                      
                        break;
                    }
              /* case emoji.MoinDeux:
                    {

                        break;
                    }
                case emoji.PlusDeux:
                    {

                    }
                case emoji.MoinHuit:
                    {

                      
                        break;
                    } 
            };
        }); 
        collector.on('end', () => embedMessage.delete());
    })
                      
                        break;
                    }
            };
        }); 
        collector.on('end', () => embedMessage.delete());
    })
    }
*/



 async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
      author: message.mentions.users.first() || message.author,
      user: message.author.username,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
      volume1: 0,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:warning: **Problème dans l'erreur du système de morceau Cause: ${error}**`);
			queue.delete(message.guild.id);
			return message.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`:warning: **Problème dans l'erreur du système de morceau Cause: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return message.channel.sendEmbed(new Discord.RichEmbed() 
    .setTitle(`:arrow_heading_up:  **${song.title}** Musique ajoutée à la file d'attente!`)
    .setColor('RANDOM'))
    .then(async sendEmbed => {
        await sendEmbed.react('▶')
        const emoji = {
            SUIVANT: '▶',
        }
        const collector = new Discord.ReactionCollector(sendEmbed, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.SUIVANT:
                    {

			serverQueue.connection.dispatcher.end();
                       
                    }
            }reaction.remove(reaction.users.filter(u => u === message.author).first());
          message.delete()
          sendEmbed.delete();
        })
    })
}
	}
  

async function play(guild, song, message) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ' :x:  | **Débit du flux pas assez.**') console.log('Musique fini.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
serverQueue.textChannel.send(`<:youtube:641302526968201216>**YouTube**🔎 \`${song.title}\``);
	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setAuthor("Gilet Jaune | 🎙  Musique à commencée", "https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif")
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nTitre', `<a:8288_L_airpod:641302546845270016>[${song.title}](${song.url})<a:9466_R_airpod:641302546643943444>`, true)
  .addField("\nNiveau sonore", `${serverQueue.volume}%`, true)
  .addField("Temps", `${song.durationm}:${song.durations}`, true)
  .setFooter(`Demandé par ${song.user}.`, ` `)
  .setColor('RANDOM'))
  .then(async embedMessage => {
        await embedMessage.react('⏸')
        await embedMessage.react('▶️')
        await embedMessage.react('⏭')
        await embedMessage.react('⏹')
        await embedMessage.react('🗃️')
        await embedMessage.react('🔁')
        await embedMessage.react('🔊')
        const emoji = {
            PAUSE: '⏸',
            CONTINUE: '▶️',
             SUIVANT: '⏭',
            NTM: '⏹',
            QUEUE: '🗃️',
            REJOUER: '🔁',
          SON: '🔊',
          
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.PAUSE:
                    {
                        if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
                        }                 
                      
                        break;
                    }
                case emoji.CONTINUE:
                    {
                        if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
                        }
                        break;
                    }
                case emoji.SUIVANT:
                    {
                        if (!message.member.voiceChannel) if (!message.member.voiceChannel)
                        break;
                    }
                case emoji.NTM:
                    {

                if (message.bot.voiceChannel) {

                message.bot.voiceChannel.leave();
                return
            }
                      
                        break;
                    }
                case emoji.QUEUE:
                    {
let index = 0;
const queue = new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor('Gilet Jaune | Queue de chanson', `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`)
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`)
    .addField('En train de jouer: ' + `${serverQueue.songs[0].title}`);

                      serverQueue.textChannel.send(queue)
                        break;
                    }
                case emoji.REJOUER:
                    {

                if(serverQueue && serverQueue.playing) 
        {
            if(serverQueue.loop == true)
            {
                serverQueue.loop = false;
                embedMessage.react('❌');
                return embedMessage.react('❌');
            }
            else
            {
                serverQueue.loop = true;
                embedMessage.react('✅');
                return embedMessage.react('✅');
            }
        }
                      
                        break;
                    }
                case emoji.SON:
                    {
const son = new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`, `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`)
  //⏬🔽🔼⏫
serverQueue.textChannel.send(son)
  .then(async embedMessage => {
        await embedMessage.react('⏬')
       /* await embedMessage.react('🔽')
        await embedMessage.react('🔼') */
        await embedMessage.react('⏫') 
        const emoji = {
            MoinHuit: '⏬',
          /* MoinDeux: '🔽',
             PlusDeux: '🔼', */
            PlusHuit: '⏫', 
          
        }
        const collector = new Discord.ReactionCollector(embedMessage, (reaction, user) => Object.values(emoji).includes(reaction.emoji.name) && !user.bot, {});
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case emoji.PlusHuit:
                    {
/* if (Math.round(dispatcher.volume * 50) <= 0) return message.channel.sendMessage(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`); */
  //   dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (2 * (message.content.split('-').length - 1))) / 50, 0));
                      if (Math.round(dispatcher.volume * 50) <= 0) return serverQueue.textChannel.send(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`);
     dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (8 * - 1))) / 50, 0);
     serverQueue.textChannel.send(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`, `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`));         
		// serverQueue.connection.dispatcher.setVolumeLogarithmic(9999 / 5);
       //               dispatcher.setVolume(9999 / 5);
                        break;
                    }
              /* case emoji.MoinDeux:
                    {

                        break;
                    }
                case emoji.PlusDeux:
                    {

                    } */
                case emoji.MoinHuit:
                    {
                    
  if (Math.round(dispatcher.volume * 50) >= 100) return serverQueue.textChannel.send(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`);
     dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (8 *  - 1))) / 50, 2);
     serverQueue.textChannel.send(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor(`:speaker: Volume: ${Math.round(dispatcher.volume*50)}%`, `https://cdn.glitch.com/be643a75-2d41-4307-bd37-38641fde67be%2Ffsqfg.gif?1558725634340.gif`));
                      
                        break;
                    } 
            }; 
        }); 
        collector.on('end', () => embedMessage.delete());
    })
                      
                        break;
                    }
            };
        }); 
        collector.on('end', () => embedMessage.delete());
    })
} 

function shuffle(songs) 
{
    var j, temp, i;
    for (i = songs.length - 1; i > 1; i--) 
    {
        j = Math.floor(Math.random() * (i + 1));
        while(j == 0)
        {
            j = Math.floor(Math.random() * (i + 1));
        }
        temp = songs[i];
        songs[i] = songs[j];
        songs[j] = temp;
    }
}


//////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(paramètres.token);
bot.login(paramètres.token);