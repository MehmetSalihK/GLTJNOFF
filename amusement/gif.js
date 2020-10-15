const request = require('superagent');

exports.run = async (bot, client, message, args) => {
        request
            .get('http://api.giphy.com/v1/gifs/random')
            .set('api_key', 'dc6zaTOxFJmzC')
            .query({ rating: message.channel.nsfw === true ? 'r' : 'pg13', fmt: 'json' })
            .query(`tag=${args.join('+')}`)
            .then(res => {
                if (res.statusCode !== 200 || res.body.meta.status !== 200) return console.log('API_ERROR')
                if (res.body.data.id !== undefined) {
                    return message.channel.send(`http://media.giphy.com/media/${res.body.data.id}/giphy.gif`)
                } else {
                    return console.log(`BOORU_NO_RESULTS, ${args}`);
                }
            });
    };