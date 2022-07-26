const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sugestao")
    .setDescription(
      "Tem alguma ideia incrível ou sugestão para agregar a mim? Envie para agora!"
    )
    .addStringOption(option =>
      option
        .setName("ideia")
        .setDescription("Qual sua sugestão?")
        .setRequired(true)
    ),
  execute(interaction) {
    const { client } = interaction;
    const input = interaction.options.getString("ideia");

    const webhookClient = new Discord.WebhookClient({
      id: "753301961591357510",
      token:
        "gg3TZzmke2xmt5yRdOsiJjyXSyTKpodan3ABih4cs209tiO-2P9Lm5atmxOLHqYS0-iv"
    });

    webhookClient
      .send({
        content:
          interaction.user.tag +
          ": ```" +
          input +
          "```\n\n ID:`" +
          interaction.user.id +
          "`"
      })
      .then(() => {
        interaction.reply({
          content:
            "Sugestão enviada ao desenvolvedor, grato! Recomendo que entre no meu servidor do discord, caso desejas, digite `/ajuda`",
          ephemeral: true
        });
      });
  }
};
