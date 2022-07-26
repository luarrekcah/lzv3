const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  config = require("../../config.json"),
  reverseImageSearch = require("node-reverse-image-search"),
  { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pir")
    .setDescription(
      "Pesquisa de Imagem Reversa, pesquise o conteúdo de uma imagem pelo link!"
    )
    .addStringOption(option =>
      option
        .setName("link")
        .setDescription("Link da imagem que deseja encontrar o nome")
        .setRequired(true)
    ),
  async execute(interaction) {
    const link = interaction.options.getString("link");

    if (!link.includes("http"))
      return interaction.reply({
        content: "Insira um link http/https.",
        ephemeral: true
      });

    if (link.includes(".gif"))
      return interaction.reply({
        content: "Não faço pesquisa de gifs no momento :/",
        ephemeral: true
      });

    const aguarde = await interaction.reply({
      content: "Pesquisando...",
      fetchReply: true,
      ephemeral: true
    });

    reverseImageSearch(link, results => {
      if (results.length < 1)
        return interaction.reply({
          content: "Não encontrei nenhum resultado, tente com outra foto :/",
          ephemeral: true
        });

      let resultsFilter = [];

      const row = new ActionRowBuilder();

      for (let i = 0; i < results.length; i++) {
        if (i == 0) continue;

        resultsFilter.push(`${i} - ${results[i].title}`);
        row.addComponents(
          new ButtonBuilder()
            .setLabel(i.toString())
            .setStyle(ButtonStyle.Link)
            .setURL(results[i].url)
        );

        if (i == 3) break;
      }

      const embed = new EmbedBuilder()
        .setTitle("PIR - Pesquisa de Imagem Reversa")
        .setColor(config.botConfig.themeColor)
        .setThumbnail(resultsFilter[1].url)
        .addFields(
          {
            name: "Resultados para seu link:",
            value: resultsFilter.join(`\n`)
          }
        );

      return interaction.followUp({ embeds: [embed], components: [row] });
    });
  }
};
