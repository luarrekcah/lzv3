const Discord = require("discord.js"),
  config = require("../config.json"),
  { EmbedBuilder } = require('discord.js');


module.exports = {
  name: "guildDelete",
  async execute( guild) {
    const { client } = guild;
    const channel = await client.channels.cache.get(config.logsChannel.guildsLogId);
    const aviso = new EmbedBuilder()
      .setColor(config.botConfig.themeColor)
      .setAuthor({ name: `Removido de : ${guild.name}`, iconURL: guild.iconURL({ dynamic: true, format: "png", size: 1024 }) })
      .addFields(
        {
          name:  "ID:",
          value: guild.id
        },
        {
          name:  "Dono",
          value: `<@${guild.ownerId}>`
        },
        {
          name: "Quantidade de Membros",
          value: `${guild.memberCount}`
        },
        {
          name: "Data de criação",
          value: `${guild.createdAt}`
        },
        )
    channel.send({embeds: [aviso]});
  }
};
