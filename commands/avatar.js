const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  config = require("../config.json");

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

    let embed = new Discord.MessageEmbed()
      .setColor(config.botConfig.themeColor)
      .setTitle(`Avatar de ${user.user.username}#${user.user.discriminator}`)
      .setImage(user.user.displayAvatarURL({ format: "png" }))
      .setFooter(
        `Pedido de: ${interaction.user.username}`,
        interaction.user.displayAvatarURL({ format: "png" })
      );

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Baixar foto")
        .setStyle("LINK")
        .setURL(user.user.displayAvatarURL({ format: "png" }))
    );

    return interaction.reply({ embeds: [embed], components:[row] });
  }
};
