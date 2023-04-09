const { MessageEmbed, MessageAttachment } = require("discord.js");
const { LOG, NSFW_CHANEL, NSFW} = require('../../config');

module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 10)+1).toString();
    const nude = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} mate les nudes de ${message.mentions.members.first().name}` : `${message.author.username} ** mate les nudes de ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/nsfw/gif/nude/' + num + '.gif');
    message.channel.send({ embed: nude, files: [file] });

    message.delete();

    const nudelog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: nude\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first()}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get(LOG);
    log_channel.send({embed : nudelog});
}

module.exports.help = {
    name: "nude",
    aliases: ['nude'],
    description: "Command Rp pour Nude",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'nsfwrp',
    hasRole: [NSFW],
    hasChannel: [NSFW_CHANEL],
    args: false
};