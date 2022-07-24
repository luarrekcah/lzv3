const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  Canvas = require("canvas"),
  canvas = Canvas.createCanvas(260, 128), //384, 128
  ctx = canvas.getContext("2d"),
  config = require("../config.json"),
  { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("couple")
    .setDescription(
      "Veja fotos lado a lado, é ótimo para ver se a metadinha ficou realmente perfeita."
    )
    .addUserOption(option =>
      option
        .setName("fotoesquerda")
        .setDescription(
          "Selecione o usuário que está do lado esquerdo da metadinha"
        )
        .setRequired(true)
    )
    .addUserOption(option =>
      option
        .setName("fotodireita")
        .setDescription(
          "Selecione o usuário que está do lado direito da metadinha"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const user1 = interaction.options.getMember("fotoesquerda");

    const user2 = interaction.options.getMember("fotodireita");

    const foto1 = await Canvas.loadImage(
      user1.user.displayAvatarURL({ format: "png" })
    );
    const foto2 = await Canvas.loadImage(
      user2.user.displayAvatarURL({ format: "png" })
    );

    ctx.drawImage(foto1, 3, 0, 128, 128); // -10, 0, 128, 128 //5 fica muito bom, mas notavel pra direita
    ctx.drawImage(foto2, 130, 0, 128, 128); //260, 0, 128, 128

    const couple = new AttachmentBuilder(
      canvas.toBuffer(),
      "couple.png"
    );

    const coupleEmbed = new EmbedBuilder()
      .setColor(config.botConfig.themeColor)
      .setImage("attachment://couple.png");

    return interaction.reply({ embeds: [coupleEmbed], files: [couple] });
  }
};
