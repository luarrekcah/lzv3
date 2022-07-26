const { SlashCommandBuilder } = require("@discordjs/builders"),
  gis = require("g-i-s"),
  Discord = require("discord.js"),
  config = require("../../config.json"),
  { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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

    const backId = 'back'
    const forwardId = 'forward'
    const backButton = new ButtonBuilder({
      style: ButtonStyle.Secondary,
      label: 'Voltar',
      emoji: '⬅️',
      customId: backId
    })
    const forwardButton = new ButtonBuilder({
      style: ButtonStyle.Secondary,
      label: 'Avançar',
      emoji: '➡️',
      customId: forwardId
    });


    gis(escolha, async (error, results) => {

      let currentIndex = 0;

      const generateEmbed = async start => {
        return new EmbedBuilder()
          .setColor(config.botConfig.themeColor)
          .setAuthor({ name: "i.s - Image Search", iconURL: config.imagesLink.infoEmbed })
          .setImage(results[start].url)
          .setDescription(
            `Resultados para ${escolha}`
          )
          .setFooter({
            text: `${results.length} resultados / Imagem atual: ${start + 1}`
          }
          );
      };

      const embed = await interaction.reply(
        {
          embeds: [await generateEmbed(0)],
          components: currentIndex === 0 ? [new ActionRowBuilder({ components: [forwardButton] })] :
            [new ActionRowBuilder({ components: [backButton, forwardButton] })]
        }
      );

      const collector = interaction.channel.createMessageComponentCollector({
        filter: i => i.user.id === interaction.user.id
      })

      collector.on('collect', async interaction => {
        interaction.customId === backId ? (currentIndex--) : (currentIndex++);
        await interaction.update({
          embeds: [await generateEmbed(currentIndex)],
          components: [
            new ActionRowBuilder({
              components: currentIndex === 0 ? [new ActionRowBuilder({ components: [forwardButton] })] :
                [new ActionRowBuilder({ components: [backButton, forwardButton] })]
            })
          ]
        })
      })

      collector.on('end', () => {
        console.log('fim');
      });
    });
  }
};
