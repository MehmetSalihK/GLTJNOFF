const config = require("./paramètres.json"),
Discord = require("discord.js"),
Parser = require("rss-parser"),
parser = new Parser(),
Youtube = require("simple-youtube-api"),
youtube = new Youtube(config.YOUTUBE_API);

const startAt = Date.now();
const lastVideos = {};

const client = new Discord.Client();
client.login(config.tokenYT).catch(console.log);

client.on("ready", () => {
    console.log(`[!] Ready to listen ${config.youtubers.length} youtubers!`);
    check();
    setInterval(check, 20*1000);
});

/**
 * Format a date to a readable string
 * @param {Date} date The date to format 
 */
function formatDate(date) {
    let monthNames = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ];
    let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
    return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
}

/**
 * Call a rss url to get the last video of a youtuber
 * @param {string} youtubeChannelName The name of the youtube channel
 * @param {string} rssURL The rss url to call to get the videos of the youtuber
 * @returns The last video of the youtuber
 */
async function getLastVideo(youtubeChannelName, rssURL){
    console.log(`[${youtubeChannelName}]  | Obtenir des vidéos...`);
    let content = await parser.parseURL(rssURL);
    console.log(`[${youtubeChannelName}]  | ${content.items.length} vidéos trouvées`);
    let tLastVideos = content.items.sort((a, b) => {
        let aPubDate = new Date(a.pubDate || 0).getTime();
        let bPubDate = new Date(b.pubDate || 0).getTime();
        return bPubDate - aPubDate;
    });
    console.log(`[${youtubeChannelName}]  | La dernière vidéo est "${tLastVideos[0] ? tLastVideos[0].title : "err"}"`);
    return tLastVideos[0];
}

/**
 * Check if there is a new video from the youtube channel
 * @param {string} youtubeChannelName The name of the youtube channel to check
 * @param {string} rssURL The rss url to call to get the videos of the youtuber
 * @returns The video || null
 */
async function checkVideos(youtubeChannelName, rssURL){
    console.log(`[${youtubeChannelName}] | Obtenez la dernière vidéo..`);
    let lastVideo = await getLastVideo(youtubeChannelName, rssURL);
    // If there isn't any video in the youtube channel, return
    if(!lastVideo) return console.log("[ERR] | No video found for "+lastVideo);
    // If the date of the last uploaded video is older than the date of the bot starts, return 
    if(new Date(lastVideo.pubDate).getTime() < startAt) return console.log(`[${youtubeChannelName}] | La dernière vidéo a été téléchargée avant le démarrage du bot`);
    let lastSavedVideo = lastVideos[youtubeChannelName];
    // If the last video is the same as the last saved, return
    if(lastSavedVideo && (lastSavedVideo.id === lastVideo.id)) return console.log(`[${youtubeChannelName}] | La dernière vidéo est la même que la dernière enregistrée`);
    return lastVideo;
}

/**
 * Get the youtube channel id from an url
 * @param {string} url The URL of the youtube channel
 * @returns The channel ID || null
 */
function getYoutubeChannelIdFromURL(url) {
    let id = null;
    url = url.replace(/(>|<)/gi, "").split(/(\/channel\/|\/user\/)/);
    if(url[2]) {
      id = url[2].split(/[^0-9a-z_-]/i)[0];
    }
    return id;
}

/**
 * Get infos for a youtube channel
 * @param {string} name The name of the youtube channel or an url
 * @returns The channel info || null
 */
async function getYoutubeChannelInfos(name){
    console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}] | Résolution des informations sur les canaux...`);
    let channel = null;
    /* Try to search by ID */
    let id = getYoutubeChannelIdFromURL(name);
    if(id){
        channel = await youtube.getChannelByID(id);
    }
    if(!channel){
        /* Try to search by name */
        let channels = await youtube.searchChannels(name);
        if(channels.length > 0){
            channel = channels[0];
        }
    }
    console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}] | Titre de la chaîne résolue: ${channel.raw ? channel.raw.snippet.title : "err"}`);
    return channel;
}

/**
 * Check for new videos
 */
async function check(){
    console.log("Checking...");
    config.youtubers.forEach(async (youtuber) => {
        console.log(`[${youtuber.length >= 10 ? youtuber.slice(0, 10)+"..." : youtuber}] | Start checking...`);
        let channelInfos = await getYoutubeChannelInfos(youtuber);
        if(!channelInfos) return console.log("[ERR] | Youtuber non valide fourni: "+youtuber);
        let video = await checkVideos(channelInfos.raw.snippet.title, "https://www.youtube.com/feeds/videos.xml?channel_id="+channelInfos.id);
        if(!video) return console.log(`[${channelInfos.raw.snippet.title}] | Aucune notification`);
      client.channels.find("id", `706855140207886346`).sendEmbed(new Discord.RichEmbed()
                        .setTimestamp()
                        .setColor(3447003)
                        .setDescription(`**Youtube Annonce!** \n\nNouvelle vidéo par **${video.author}**! \n Titre de la vidéo **(${video.title})**[${video.link}]`)
      .setFooter(`La vidéo a été téléchargé le ${formatDate(new Date(video.pubDate))}`).setThumbnail(client.user.avatarURL)
      .setThumbnail("https://img.youtube.com/vi/" + channelInfos.id + "/0.jpg"))
      client.channels.find("id", `706855140207886346`).send(`${video.link}`);
        console.log("Notification sent !");
        lastVideos[channelInfos.raw.snippet.title] = video;
    });
}