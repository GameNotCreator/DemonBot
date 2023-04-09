const { MessageEmbed} = require("discord.js");
module.exports.run = async (client, message, args) => {
    if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100))return message.reply('il faut spécifier un **nombre** entre 1 et 100');

    const messages = await message.channel.messages.fetch({
        limit: Math.min(args[0], 100),
        before: message.id,
    });
    
    await message.channel.bulkDelete(messages);

    const clearlog = new MessageEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: clear/purge \n**Nombre de Message**: ${args[0]} \n**Salon**: ${message.channel}`)
        .setThumbnail('https://cdn.discordapp.com/avatars/' + message.author.id + '/' + message.author.avatar + '.png')
        .setTimestamp()
        .setFooter('Cordialement 悪魔')

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({ embed : clearlog });
    
    message.delete();


    const m = await message.channel.send(`${args[0]} message(s) ont été supprimé par ${message.author.username}`);
    setTimeout(() => {
        m.delete()
        }, 3000);        
}

module.exports.help = {
    name: "clear",
    aliases: ['clear', 'purge'],
    description: "Efface un nombre de message spécifier",
    cooldown: 10,
    usage: '<votre_nombre>',
    hasPerms: ['MANAGE_MESSAGES'],
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'moderation',
    args: true
};