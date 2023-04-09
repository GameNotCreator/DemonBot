const { MessageEmbed, MessageAttachment } = require("discord.js");
const { LOG, NSFW_CHANEL, NSFW} = require('../../config');

module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 9)+1).toString();
    const cum = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} ejacule sur ${message.mentions.members.first().user.username}` : `${message.author.username} ** ejacule sur ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/nsfw/gif/cum/' + num + '.gif');
    message.channel.send({ embed: cum, files: [file] });

    message.delete();

    const cumlog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: cum\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().user.username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get(LOG);
    log_channel.send({embed : cumlog});
}

module.exports.help = {
    name: "cum",
    aliases: ['cum'],
    description: "Command Rp pour Cum",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'nsfwrp',
    hasRole: [NSFW],
    hasChannel: [NSFW_CHANEL],
    args: false
};