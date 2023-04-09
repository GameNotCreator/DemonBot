const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first();
    const reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');

    if(user){
        user.send('Vous avez été Kick de ce serveur, si vous le souhaitez vous pouvez contacter 悪魔#2401 ou beneto#1635 pour des explications')
        const kick = new MessageEmbed()
        .setColor('#000000')
        .setTitle(`${message.author.username} a exclu ${message.mentions.users.first().username}`)
        .setImage('attachment://kick.gif')
        .setTimestamp()
        .setFooter('Cordialement 悪魔')
        const file = new MessageAttachment('./assets/moderation/kick.gif');
        message.channel.send({ embed: kick, files: [file] });
        message.guild.member(user).kick(reason)

        const kicklog = new MessageEmbed()
        .setAuthor(`${user.username} (${user.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
        .setThumbnail(user.avatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({embed : kicklog});
    }
    else{
        message.channel.send("L'utilisateur n'existe pas!");
    }

    message.delete();

    const m = await message.channel.send(`${message.mentions.users.first().username} a été kick par ${message.author.username}`);
        setTimeout(() => {
            m.delete()
            }, 3000);  
};

module.exports.help = {
    name: "kick",
    aliases: ['kick'],
    description: "Exclu une personne du Serveur",
    usage: '<user_mention> <reason>',
    cooldown: 5,
    hasPerms: ['KICK_MEMBERS'],
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'moderation',
    args: true
};