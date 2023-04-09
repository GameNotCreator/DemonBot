const message = require("./message");
const { MessageEmbed } = require("discord.js");

module.exports = async (client) => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setStatus("dnd");
  setTimeout(() => {
      client.user.setActivity("Pornhub", {type: 'WATCHING'});
  }, 100)

  const owner = await client.users.fetch('616751085696319494')
  const ownerMp = new MessageEmbed()
    .setColor('#000000')
    .setTitle('Salut maitre, je suis en vie')
    .setImage(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter('Cordialement 悪魔')
    owner.send(ownerMp);
}