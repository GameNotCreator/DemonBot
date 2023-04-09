const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = async (client, message, args) => {
    const member = await client.users.fetch(args[0]);
    
    if(!member || !member.id)return message.channel.send("L'utilisateur n'existe pas!");
        message.guild.members.unban(member);
        member.send('Vous avez été unban de ce serveur, si vous le souhaitez vous pouvez contacter 悪魔#2401 ou beneto#1635 pour des explications')
        const unban = new MessageEmbed()
        .setColor('#000000')
        .setTitle(`${message.author.username} a debanni ${member.username}`)
        .setImage('attachment://unbanned.gif')
        .setTimestamp()
        .setFooter('Cordialement 悪魔')
        const file = new MessageAttachment('./assets/moderation/unbanned.gif');
        message.channel.send({ embed: unban, files: [file] });

        const unbanlog = new MessageEmbed()
        .setAuthor(`${member.username} (${member.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: unban`)
        .setThumbnail(member.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL());

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({ embed : unbanlog });

    message.delete();

    const m = await message.channel.send(`${member.username} a été debanni par ${message.author.username}`);
        setTimeout(() => {
            m.delete()
            }, 3000);  
};

module.exports.help = {
    name: "unban",
    aliases: ['unban'],
    description: "Unban une personne du Serveur",
    usage: '<user_id>',
    cooldown: 5,
    hasPerms: ['BAN_MEMBERS'],
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'moderation',
    args: true
};