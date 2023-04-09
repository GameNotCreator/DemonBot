const ms = require("ms");
const { MessageEmbed, MessageAttachment } = require("discord.js");
module.exports.run = async (client, message, args) => {
    let user = message.guild.member(message.mentions.users.first());
    let muterole = message.guild.roles.cache.find(r => r.name === 'muted');
    let muteTime = (args [1] || '300s');
    
    if(!muterole) {
        muterole = await message.guild.roles.create({
            data: {
                name: 'muted',
                color: '#000',
                permission: []
            }
        });

        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.updateOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false
            });
        }); 
    }

    await user.roles.add(muterole.id);
    message.mentions.members.first().send(`Vous avez été muté par ${message.author.username} pendant ${ms(ms(muteTime))}`)
    const mute = new MessageEmbed()
    .setColor('#000000')
    .setTitle(`${message.author.username} a muté ${message.mentions.users.first().username} pendant ${ms(ms(muteTime))}`)
    .setImage('attachment://mute.gif')        
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    const file = new MessageAttachment('./assets/moderation/mute.gif');
    message.channel.send({ embed: mute, files: [file] });

    setTimeout(() => {
        user.roles.remove(muterole.id);
    }, ms(muteTime));

    const mutelog = new MessageEmbed()
        .setAuthor(`${message.mentions.users.first().username} (${user.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: mute\n**Time**: ${ms(ms(muteTime))}`)
        .setThumbnail('https://cdn.discordapp.com/avatars/' + message.mentions.users.first().id + '/' + message.mentions.users.first().avatar + '.png')
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL());

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({ embed : mutelog });

    message.delete();

    const m = await message.channel.send(`${message.mentions.users.first().username} a été muté par ${message.author.username}`);
        setTimeout(() => {
            m.delete()
            }, 3000);  
};

module.exports.help = {
    name: "mute",
    aliases: ['mute'],
    description: "Mute une personne du Serveur Temporairement",
    usage: '`<user_mention> <time>`',
    cooldown: 5,
    hasPerms: ['MUTE_MEMBERS, MANAGE_ROLES'],
    hasRole: ['837393224872099930', '876121829331312661', '837002705347411968', '802514820980539403'],
    category: 'moderation',
    args: true
};