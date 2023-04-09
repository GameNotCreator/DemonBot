module.exports.run = (client, message, args) => {
    message.channel.send("Pong!");
}

module.exports.help = {
    name: "ping",
    aliases: ['ping'],
    description: "Renvoie pong!",
    cooldown: 10,
    usage: '<votre_message>',
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'autres',
    args: false
};