 const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ideia")
    .setDescription(
      "Está com algo em mente e deseja abrir uma votação? Use esse comando!"
    )
    .addStringOption(option =>
      option
        .setName("ideia")
        .setDescription("Qual sua ideia?")
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName("destino")
        .setDescription(
          "Selecione um canal de destino, ignore caso queira que seja o canal atual."
        )
    ),
  async execute(interaction) {
    const { client } = interaction;
    const ideia = interaction.options.getString("ideia");

    const ops = interaction.options.getChannel("destino");

    const canal =
      ops == null
        ? await client.channels.cache.get(interaction.channel.id)
        : await client.channels.cache.get(ops.id);

    const ideiaEmbed = new Discord.MessageEmbed()
      .setColor(config.botConfig.themeColor)
      .addField("Autor:", interaction.user.username)
      .addField("Conteúdo", ideia)
      .setFooter("ID do Autor: " + interaction.user.id)
      .setTimestamp();

    try {
      canal.send({ embeds: [ideiaEmbed] }).then(async embed => {
        const emojis = ["✅", "❌"];

        for (const i in emojis) {
          await embed.react(emojis[i]);
        }

        return interaction.reply({
          content: "Enviei sua ideia! Cheque o canal",
          ephemeral: true
        });
      });
    } catch (error) {
      return interaction.reply({
        content:
          "Ocorreu um erro ao enviar essa mensagem, eu posso enviar mensagens nesse canal?",
        ephemeral: true
      });
    }
  }
};
