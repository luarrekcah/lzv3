const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Alguma dúvida sobre mim? Use esse comando!"),
  async execute(interaction) {
    const { client } = interaction;

    const dev = client.users.cache.get(config.botConfig.devId);
    const ano = new Date();
    const embed = new Discord.MessageEmbed()

      .setColor(config.botConfig.themeColor)

      .setAuthor("Ajuda - Resumo", config.imagesLink.infoEmbed)
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
      .setFooter(
        `${ano.getFullYear()} © ${client.user.username} | ${dev.username} `
      );

    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setLabel("Adicionar")
          .setStyle("LINK")
          .setURL(config.links.addBot)
      )
      .addComponents(
        new Discord.MessageButton()
          .setLabel("Website")
          .setStyle("LINK")
          .setURL(config.links.website)
      )
      .addComponents(
        new Discord.MessageButton()
          .setLabel("Suporte")
          .setStyle("LINK")
          .setURL(config.links.supportGuild)
      )
      .addComponents(
        new Discord.MessageButton()
          .setLabel("Votar")
          .setStyle("LINK")
          .setURL(config.links.topGG)
      );
    return interaction.reply({ embeds: [embed], components: [row] });
  }
};
