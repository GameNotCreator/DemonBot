const { MessageEmbed, MessageAttachment } = require("discord.js");
const { LOG, NSFW_CHANEL, NSFW} = require('../../config');

module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 19)+1).toString();
    const fuck = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} nique ${message.mentions.members.first().user.username}` : `${message.author.username} ** nique ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/nsfw/gif/fuck/' + num + '.gif');
    message.channel.send({ embed: fuck, files: [file] });

    message.delete();

    const fucklog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: fuck\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().user.username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get(LOG);
    log_channel.send({embed : fucklog});
}

module.exports.help = {
    name: "fuck",
    aliases: ['fuck'],
    description: "Command Rp pour Fuck",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'nsfwrp',
    hasRole: [NSFW],
    hasChannel: [NSFW_CHANEL],
    args: false
};