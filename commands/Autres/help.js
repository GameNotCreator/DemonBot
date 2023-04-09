const { MessageEmbed } = require("discord.js");
const { PREFIX } = require("../../config");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');

module.exports.run = (client, message, args) => {

    const helplog = new MessageEmbed()
        .setAuthor(`${message.author.username} (${message.author.id})`)
        .setColor("#000000")
        .setDescription(`**Action**: help \n**Commande Recherchée:** ${args[0]}`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter('Cordialement 悪魔')

        const log_channel = client.channels.cache.get('879668986156040223');
        log_channel.send({ embed : helplog });

    if (!args.length) {
        const helpEmbed = new MessageEmbed()
        .setColor("#000000")
        .addField("Liste des commandes", `Une liste des commandes disponibles et leurs sous-catégories \nPour plus d'informations sur une commande, tapez \`${PREFIX}help <command_name>\``)

        for (const category of categoryList) {
            helpEmbed.addField(
                `${category}`,
                `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
            );
        };
        return message.channel.send(helpEmbed)
    }else {
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
        if (!command) return message.reply("cette commande n'existe pas:"); 

        const helpcommandembed = new MessageEmbed()
        .setColor("#000000")
        .setTitle(`\`${command.help.name}\``)
        .addField("Description", `${command.help.description} (cooldown: ${command.help.cooldown} secs)`)
        .addField("Utilisation", command.help.usage ? `${PREFIX}${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
        
        if (command.help.aliases.length > 1) helpcommandembed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
        return message.channel.send(helpcommandembed);
    }

}

module.exports.help = {
    name: "help",
    aliases: ['help'],
    description: "Renvoie la liste des commandes",
    cooldown: 3,
    usage: '<command_name>',
    category: 'autres',
    args: false
};