const { Collection } = require('discord.js');
const { PREFIX } = require('../../config');
module.exports = (client, message) => {
  
    //Verfication si la commande existe
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    console.log(args)
    
    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return; 

    //Verfication la personne qui utilise cette commande a les permissions
    if (command.help.hasPerms && !message.member.permissionsIn(message.channel).has(command.help.hasPerms)) return message.reply("Tu n'as pas la permission d'utilise cette commande!")
 
    //Verfication des arguments
    if (command.help.args && !args.length) {
      let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

      if (command.help.usage) noArgsReply += `\n Voici comment utiliser la commande: \`${PREFIX}${command.help.name} ${command.help.usage}\``
      return message.channel.send(noArgsReply);
    }

    //Verfication si la personne est bannisable 
    if (command.help.hasPerms && message.mentions.members.first()?.hasPermission(command.help.hasPerms)) return message.reply("Tu n'as pas la permission d'utiliser cette commande sur cet utilisateur!");

    //Verification de role 
    if (command.help.hasRole && !command.help.hasRole.some((id) => message.member.roles.cache.get(id))) return message.reply("Tu n'as pas le role necessaire pour utiliser cette commande!");

    //Verification de channel
    if (command.help.hasChannel && !command.help.hasChannel.some((id) => message.channel.id == (id))) return message.reply("Tu n'est pas autorisé a utiliser cette commande dans ce salon!");
    
    //Verification si le channel est nsfw
    if(command.help.isNsfw && !message.channel.nsfw)return message.channel.send('Ce channel est pas un Channel Nsfw');

    //Creation de cooldown
    if (!client.cooldowns.has(command.help.name)) {
      client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if (tStamps.has(message.author.id)) {
      const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
      
      if (timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;
        return message.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args);
}