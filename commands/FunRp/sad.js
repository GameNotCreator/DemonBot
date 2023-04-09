const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 10)+1).toString();
    const sad = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.mentions.members.first()} est triste ` : `${message.author.username} ** est triste **`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/gif/sad/' + num + '.gif');
    message.channel.send({ embed: sad, files: [file] });

    message.delete();

    const sadlog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: sad\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get('879668986156040223');
    log_channel.send({embed : sadlog});
}

module.exports.help = {
    name: "sad",
    aliases: ['sad'],
    description: "Command Rp pour Sad",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'funrp',
    args: false
};