const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = async (client, message, args) => {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';
    console.log(member)
    if(!member || !member.id)return message.channel.send("L'utilisateur n'existe pas!");

        member.send('Vous avez été Banni de ce serveur, si vous le souhaitez vous pouvez contacter 悪魔#2401 ou beneto#1635 pour des explications')
        const ban = new MessageEmbed()
        .setColor('#000000')
        .setTitle(`${message.author.username} a banni ${member.user.username}`)
        .setImage('attachment://banned.gif')
        .setTimestamp()
        .setFooter('Cordialement 悪魔')
        const file = new MessageAttachment('./assets/moderation/banned.gif');
        message.channel.send({ embed: ban, files: [file] });

        const banlog = new MessageEmbed()
        .setAuthor(`${message.mentions.users.first().username} (${member.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: ban\n**Raison**: ${reason}`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL());

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({ embed : banlog });

        member.ban({ days: 7, reason: reason })

        message.delete();

        const m = await message.channel.send(`${message.mentions.users.first().username} a été banni par ${message.author.username}`);
        setTimeout(() => {
            m.delete()
            }, 3000);        
};

module.exports.help = {
    name: "ban",
    aliases: ['ban'],
    description: "Banni definitivemenet une personne du Serveur",
    usage: '<user_mention> <reason>',
    cooldown: 5,
    hasPerms: ['BAN_MEMBERS'],
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'moderation',
    args: true
};