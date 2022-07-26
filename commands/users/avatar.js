const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  config = require("../../config.json"),
  { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Veja seu avatar ou o de alguém.")
    .addUserOption(option =>
      option
        .setName("usuario")
        .setDescription("Selecione o usuário que você quer ver o avatar")
    ),
  execute(interaction) {
    const user = interaction.options.getMember("usuario") || interaction;

    let embed = new EmbedBuilder()
      .setColor(config.botConfig.themeColor)
      .setTitle(`Avatar de ${user.user.username}#${user.user.discriminator}`)
      .setImage(user.user.displayAvatarURL({ format: "png", size: 1024, dynamic: true }))
      .setFooter({
        text: `Pedido de: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ format: "png", size: 1024, dynamic: true })
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Baixar foto")
        .setStyle(ButtonStyle.Link)
        .setURL(user.user.displayAvatarURL({ format: "png", size: 1024, dynamic: true }))
    );

    return interaction.reply({ embeds: [embed], components: [row] });
  }
};
