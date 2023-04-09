const ms = require("ms");
const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first());
    let muterole = message.guild.roles.cache.find(r => r.name === 'muted');

    if (!user.roles.cache.has(muterole.id)) return message.reply("L'utilisateur mentionné n'est pas muté!");
    await user.roles.remove(muterole.id);
    message.mentions.members.first().send(`Vous avez été unmuté par ${message.author.username}`)
    const unmute = new MessageEmbed()
    .setColor('#000000')
    .setTitle(`${message.author.username} a unmuté ${message.mentions.users.first().username}`)
    .setImage('attachment://unmute.gif')        
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('./assets/moderation/unmute.gif');
    message.channel.send({ embed: unmute, files: [file] });

    const unmutelog = new MessageEmbed()
        .setAuthor(`${message.mentions.users.first().username} (${user.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: unmute`)
        .setThumbnail('https://cdn.discordapp.com/avatars/' + message.mentions.users.first().id + '/' + message.mentions.users.first().avatar + '.png')
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL());

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({ embed : unmutelog });

    message.delete();

    const m = await message.channel.send(`${message.mentions.users.first().username} a été unmuté par ${message.author.username}`);
        setTimeout(() => {
            m.delete()
            }, 3000);  
};

module.exports.help = {
    name: "unmute",
    aliases: ['demute'],
    description: "Unmute une personne du Serveur",
    usage: '`<user_mention>`',
    cooldown: 5,
    hasPerms: ['MUTE_MEMBERS'],
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'moderation',
    args: true
};