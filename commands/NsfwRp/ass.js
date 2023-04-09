const { MessageEmbed, MessageAttachment } = require("discord.js");
const { LOG, NSFW_CHANEL, NSFW} = require('../../config');
module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 9)+1).toString();
    const ass = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} mate le cul de ${message.mentions.members.first().user.username}` : `${message.author.username} ** mate le cul de ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/nsfw/gif/ass/' + num + '.gif');
    message.channel.send({ embed: ass, files: [file] });

    message.delete();

    const asslog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: ass\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().user.username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get(LOG);
    log_channel.send({embed : asslog});
}

module.exports.help = {
    name: "ass",
    aliases: ['ass'],
    description: "Command Rp pour Ass",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'nsfwrp',
    hasRole: [NSFW],
    hasChannel: [NSFW_CHANEL],
    args: false
};