const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = (client, message, args) => {
    const num = (Math.floor(Math.random()* 10)+1).toString();
    const punch = new MessageEmbed()
    .setColor('#000000')
    .setTitle(message.mentions.members.first() ? `${message.author.username} cogne ${message.mentions.users.first().username}` : `${message.author.username} ** cogne ** ${client.user.username}`)
    .setImage('attachment://' + num + '.gif')
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('assets/gif/punch/' + num + '.gif');
    message.channel.send({ embed: punch, files: [file] });

    message.delete();

    const punchlog = new MessageEmbed()
    .setColor('#000000')
    .setAuthor(`${message.author.username} (${message.author.id})`)
    .setDescription(`**Action**: punch\n**Avec**: ` + message.mentions.members.first() ? `${message.mentions.members.first().username}` : `${client.user.username}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')

    const log_channel = client.channels.cache.get('879668986156040223');
    log_channel.send({embed : punchlog});
}

module.exports.help = {
    name: "punch",
    aliases: ['punch'],
    description: "Command Rp pour Punch",
    cooldown: 10,
    usage: '<user_mention>',
    category: 'funrp',
    args: false
};