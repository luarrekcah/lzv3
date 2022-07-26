const Discord = require("discord.js"),
  config = require("../config.json"),
  { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "guildCreate",
  async execute(guild) {
    const { client } = guild;
    const channel = await client.channels.cache.get(config.logsChannel.guildsLogId);
    console.log(guild);

    /*let channela;
    guild.channels.cache.forEach(ch => {
      console.log(ch);
    });*/

   // const invite = await channela.createInvite({ reason: `Para os desenvolvedores do ${client.user.tag}`, maxAge: 0 });

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
        },
        {
          name: "Quantidade de Membros",
          value: `${guild.memberCount}`
        },
        {
          name: "Data de criação",
          value: `${guild.createdAt}`
        }/*,
        {
          name: "Convite",
          value: `[invite](https://discord.gg/${invite.code})`
        }*/
      );

    channel.send({ embeds: [aviso] });
  }
};
