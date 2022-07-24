const Discord = require("discord.js"),
  config = require("../config.json"),
  { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "guildCreate",
  async execute(guild) {
    const { client } = guild;
    const channel = await client.channels.cache.get(config.logsChannel.guildsLogId);
    console.log(guild);
    const aviso = new EmbedBuilder()
      .setColor(config.botConfig.themeColor)
      .setAuthor(
        {
          name: `Adicionado em : ${guild.name}`,
          iconURL: guild.iconURL({ dynamic: true, format: "png", size: 1024 })
        }
      )
      .addFields(
        {
          name: "ID:",
          value: guild.id
        },
        {
          name: "Dono",
          value: `<@${guild.ownerId}>`
        }
      );

    channel.send({ embeds: [aviso] });
  }
};
