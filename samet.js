if (bookmessage !== undefined) {
  bookmessage.edit(help).then(result => reactions(result));
} else {
  message.channel.send(help).then(async function (result) {
    
    reactions(result);
    await result.react('1')
  })
}

function reactions(result) {
  const filter = (reaction, user) => {
    return ["1"].includes(reaction.emoji.name) && user.id === message.author.id;
  }
  result.awitReaction(filter, {max: 1, maxEmoji: 1})
  .then(collected => {
    const reaction = collected();
    reaction.remove(message.author.id);
  })
}