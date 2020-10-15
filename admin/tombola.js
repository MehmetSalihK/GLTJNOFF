const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    // Argumenten die we later nodig hebben.
    var item = "";
    var time;
    var winnerCount;
 
    // Nakijken als je perms hebt om dit command te doen.
    if (!message.guild) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: {color: 15158332, description: `<:attention:641302530613313536> | Vous avais pas l'autorisation!`}});
    return message.channel.send(new discord.RichEmbed().setColor('RANDOM').setTitle('Tombola').setDescription(`Vous ne pouvez pas utiliser cette commande directement dans le message.`).setFooter(`Pour de l'aide [${message.prefix}aide]`, bot.user.avatarURL).setTimestamp()); }
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(new discord.RichEmbed().setColor('RANDOM').setTitle('Tombola').setDescription(`utilisation: \`${message.prefix}tombola <nombre> <seconde> <cadeau> <message>\``).setFooter(`Pour de l'aide [${message.prefix}aide]`, bot.user.avatarURL).setTimestamp());
 
    // !giveaway aantalWinnaars seconden itemOmTeWinnen.
 
    // Aantal winnaars opvragen.
    winnerCount = args[0];
    // Tijd hoelang het moet duren.
    time = args[1];
    // Welke prijs men kan winnen.
    item = args.splice(2, args.length).join(' ');
 
    // Verwijder het bericht dat net is gemaakt door de gebruiker.
    message.delete();
 
    // Verval datum berekenen.
    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));
 
    // Maak embed aan.
    var giveawayEmbed = new discord.RichEmbed()
    .setColor('#ff0000')
    .setThumbnail("https://cdn.glitch.com/88535ec8-18b1-4666-8b6e-77042142324c%2F21166948085b1d03a846fae.png?v=1574004984184.png")
        .setTitle(`**GIVEAWAY** <a:Rainbow_Hyper_Tada:641302578982027274> `)
    .setDescription(`\`${winnerCount}\` personne gagnera **${item}** 🎁\n Se termine en \`${time}\` secondes!`)
 
    // Verzend embed en zet de reactie op de popper.
    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");
 
    // Zet een timeout die na het aantal seconden af gaat.
    setTimeout(function () {
 
        // Argumenten die we nodig hebben.
        var random = 0;
        var winners = [];
        var inList = false;
 
        // Verkrijg de gebruikers die gereageerd hebben op de giveaway.
        var peopleReacted = embedSend.reactions.get("🎉").users.array();
 
        // Hier gaan we al de mensen over gaan en kijken als de bot er tussen staan
        // De bot moeten we uit de lijst weghalen en dan gaan we verder.
        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        // Hier kijken we na als er wel iemand heeft meegedaan.
        if (peopleReacted.length == 0) {
            return message.channel.send("Personne ne gagne, le bot gagne :)");
        }
 
        // Tijdelijk kijken we na als er te wienig mensen hebben mee gedaan aan de wedstrijd.
        if (peopleReacted.length < winnerCount) {
            return message.channel.send("Très peu de gens sont impliqués, nous avons donc gagné les bottes :)");
        }
 
        // Voor het aantal winnaars dat we eerder hebben opgegeven gaan we een random nummer aanmaken en de user in een array zetten.
        for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
            // Aanmaken van een random getal zodat we een user kunnen kiezen.
            random = Math.floor(Math.random() * peopleReacted.length);
 
            // Als een winnaar al voorkomt in de winnaars lijst dan moeten we opnieuw gaan zoeken naar een andere winnaar.
            for (var y = 0; y < winners.length; y++) {
                // Nakijken als de geslecteerde winnaar al in de lijst zit.
                if (winners[y] == peopleReacted[random]) {
                    // We zetten i 1 minder zodat we opnieuw kunnen doorgaan in de lijst.
                    i--;
                    // We zetten dit op true zodat we weten dat deze al in de lijst zit.
                    inList = true;
                    break;
                }
            }
 
            // Zit deze niet in de lijst gaan we deze toevoegen.
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
 
        // Voor iedere winnaar gaan we een bericht sturen.
        for (var i = 0; i < winners.length; i++) {      
          message.channel.send({embed: {
   color: 1127128,
   description: `<a:Rainbow_Hyper_Tada:641302578982027274> Gagnant<a:Rainbow_Hyper_Tada:641302578982027274>\n${winners[i]}\n\n 🎁 \n\`${item}\``
}});
        }
 
    }, 1000 * time);
 
 
}
 
module.exports.help = {
    name: "çekiliş",
    description: "Start een giveaway"
}