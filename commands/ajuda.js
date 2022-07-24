const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  config = require("../config.json"),
  { EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Alguma dúvida sobre mim? Use esse comando!"),
  async execute(interaction) {
    const { client } = interaction;

    const dev = client.users.cache.get(config.botConfig.devId);
    const ano = new Date();
    const embed = new EmbedBuilder()

      .setColor(config.botConfig.themeColor)
      .setAuthor({ name: "Ajuda - Resumo", iconURL: config.imagesLink.infoEmbed })
      .setImage(config.imagesLink.helpBanner)
      .setDescription(
        `Um bot para moderação, RP valorizado, economia e diversão geral. Legal, né?! Se quiser ver tudo que posso fazer, entre no meu site! :)`
      )
      .addFields(
        {
          name: "<a:love:758339794492981258> | Eu nasci no dia:",
          value: "09/08/2020 :partying_face:!"
        }
      )
      .setFooter({
        text: `${ano.getFullYear()} © ${client.user.username} | ${dev.username} `
      }
      );

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Adicionar")
          .setStyle(ButtonStyle.Link)
          .setURL(config.links.addBot)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel("Website")
          .setStyle(ButtonStyle.Link)
          .setURL(config.links.website)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel("Suporte")
          .setStyle(ButtonStyle.Link)
          .setURL(config.links.supportGuild)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel("Votar")
          .setStyle(ButtonStyle.Link)
          .setURL(config.links.topGG)
      );
    return interaction.reply({ embeds: [embed], components: [row] });
  }
};
