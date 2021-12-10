const Discord = require("discord.js"),
  config = require("../config.json");

module.exports = {
  name: "guildDelete",
  async execute( guild) {
    const { client } = guild;
    const channel = await client.channels.cache.get(config.logsChannel.guildsLogId);
    const aviso = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(
        "Removido de : " + guild.name,
        guild.iconURL({ dynamic: true, format: "png", size: 1024 })
      )
      .addField("ID:", guild.id)
      .addField("Dono", "<@" + guild.fetchOwner().id  + ">");
    
    channel.send({embeds: [aviso]});
  }
};
