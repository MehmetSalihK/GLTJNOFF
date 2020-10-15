exports.run = async (bot, message, args, level) => { // eslint-disable-line no-unused-vars
  message.delete();
    var uses = args[0];
    var age = args[1];

    if (!uses) {
        return message.reply('Davetin Kaç kullanımlık olacağını belirt...');
    }
    if (!age) {
        message.reply('Davetin süresini belirt');
        age = await 0;
    }

    uses = await uses.toString(); // Have to convert to string for indexOf(...) below

    if (uses.indexOf('.') !== -1) {
        return message.reply('Bir insanın sadece bir bölümünü nasıl davet edebilirsiniz? 😕'); // There will always be those people
    }

    age = await age.toString();

    if (age.indexOf('s') !== -1) { // Seconds
        age = await age.replace(/s.*/, '');
    } else if (age.indexOf('m') !== -1) { // Minutes
        var agemin = await age.replace(/m.*/, '');
        age = await agemin * 60;
    } else if (age.indexOf('h') !== -1) { // Hours
        var agehour = await age.replace(/h.*/, '');
        age = await agehour * 60 * 60;
    } else if (age.indexOf('d') !== -1) { // Days
        var ageday = await age.replace(/d.*/, '');
        age = await ageday * 60 * 60 * 24;
    } else {
        if (age.indexOf('.') !== -1) {
            return message.reply('Hayır, saniye tam sayı olmalıdır.'); // For people who want to do this
        }
        age = await age; // No value letter can be found. This is seconds
    }

    message.channel.createInvite({ maxUses: uses, maxAge: age }).then((invite) => {
        //console.log(invite);
        message.author.send(`Davetiniz \`${invite}\` \`Maximimum Kullanım: ${uses}, Maximum Süre: ${age}\``);
    });
};


module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["test"],
  permLevel: 0
};

module.exports.help = {
  name: 'test',
  description: 'Gelişmiş davet',
  usage: 'davet'
};