const { MessageEmbed, MessageAttachment } = require("discord.js");
const { LOG, NSFW_CHANEL, NSFW} = require('../../config');

module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 9)+1).toString();
    const suck = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} suce ${message.mentions.users.first().username}` : `${message.author.username} ** suce ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/nsfw/gif/suck/' + num + '.gif');
    message.channel.send({ embed: suck, files: [file] });

    message.delete();

    const sucklog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: suck\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get(LOG);
    log_channel.send({embed : sucklog});
}

module.exports.help = {
    name: "suck",
    aliases: ['suck'],
    description: "Command Rp pour Suck",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'nsfwrp',
    hasRole: [NSFW],
    hasChannel: [NSFW_CHANEL],
    args: false
};