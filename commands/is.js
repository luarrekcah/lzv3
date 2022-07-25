const { SlashCommandBuilder } = require("@discordjs/builders"),
  gis = require("g-i-s");
  Discord = require("discord.js"),
  config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("is")
    .setDescription(
      "Image Search - Pesquise Imagens pelo nome"
    )
    .addStringOption(option =>
      option
        .setName("query")
        .setDescription("Imagem de quê você busca?")
        .setRequired(true)
    ),
  execute(interaction) {

    if (interaction.user.id != config.botConfig.devId)
      return interaction.reply({
        content: "Olá! Meu desenvolvedor está trabalhando nesse comando.",
        ephemeral: true
      });

    const { client } = interaction;
    const escolha = interaction.options.getString("query");

    gis(escolha, logResults);
   
    console.log(logResults);
  }
};
