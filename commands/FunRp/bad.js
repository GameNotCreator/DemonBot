const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first(username);
    const num = (Math.floor(Math.random()* 10)+1).toString();
    const bad = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} insulte ${user}` : `${message.author.username} ** insulte ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/gif/bad/' + num + '.gif');
    message.channel.send({ embed: bad, files: [file] });

    message.delete();

    const badlog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: bad\n**Avec**: ` + message.mentions.members.first() ? `${user}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get('879668986156040223');
    log_channel.send({embed : badlog});
}

module.exports.help = {
    name: "bad",
    aliases: ['bad'],
    description: "Command Rp pour Bad",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'funrp',
    args: false
};