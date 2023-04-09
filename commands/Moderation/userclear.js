const { MessageEmbed} = require("discord.js");
module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first());
    if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100))return message.reply('Il faut spécifier un **nombre** entre 1 et 100');

    const messages = (await message.channel.messages.fetch({
        limit: 100,
        before: message.id,
    })).filter(a => a.author.id === user.id).array();

    messages.length = Math.min(args[1], messages.length);

    if(messages.length === 0 || !user) return message.reply('Aucun message à supprimer sur cet utilisateur (ou il cet utilisateur n\'existe pas)');

    if (messages.length === 1 ) await messages[0].delete();
    else await message.channel.bulkDelete(messages);

    const unclearlog = new MessageEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: unclear/prune \n**Nombre de Message**: ${args[1]} \n**Utilisateur**: ${args[0]}`)
        .setThumbnail('https://cdn.discordapp.com/avatars/' + message.author.id + '/' + message.author.avatar + '.png')
        .setTimestamp()
        .setFooter('Cordialement 悪魔')

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({ embed : unclearlog });
    
    message.delete();

    const m = await message.channel.send(`${args[1]} message(s) ont été supprimé par ${message.author.username}`);
    setTimeout(() => {
        m.delete()
        }, 3000); 
}

module.exports.help = {
    name: "userclear",
    aliases: ['userclear', 'prune'],
    description: "Efface un nombre de message d'un utilisateur spécifier",
    cooldown: 10,
    usage: '<votre_nombre>',
    hasPerms: ['MANAGE_MESSAGES'],
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'moderation',
    args: true
};