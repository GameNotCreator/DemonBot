const { MessageEmbed, MessageAttachment } = require("discord.js");
const { LOG, NSFW_CHANEL, NSFW} = require('../../config');

module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 11)+1).toString();
    const boobs = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} mate les seins de ${message.mentions.members.first().user.username}` : `${message.author.username} ** mate les seins de ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/nsfw/gif/boobs/' + num + '.gif');
    message.channel.send({ embed: boobs, files: [file] });

    message.delete();

    const boobslog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: boobs\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().user.username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get(LOG);
    log_channel.send({embed : boobslog});
}

module.exports.help = {
    name: "boobs",
    aliases: ['boobs'],
    description: "Command Rp pour Boobs",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'nsfwrp',
    hasRole: [NSFW],
    hasChannel: [NSFW_CHANEL],
    args: false
};