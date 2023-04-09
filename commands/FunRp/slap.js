const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 10)+1).toString();
    const slap = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} donne une claque à ${message.mentions.users.first().username}` : `${message.author.username} ** donne une claque à ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/gif/slap/' + num + '.gif');
    message.channel.send({ embed: slap, files: [file] });

    message.delete();

    const slaplog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: slap\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get('879668986156040223');
    log_channel.send({embed : slaplog});
}

module.exports.help = {
    name: "slap",
    aliases: ['slap'],
    description: "Command Rp pour Slap",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'funrp',
    args: false
};