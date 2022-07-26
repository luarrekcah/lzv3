const { SlashCommandBuilder } = require("@discordjs/builders"),
  config = require("../../config.json"),
  vdds = require("../../data/vdds.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vdd")
    .setDescription("Uma pergunta aleatória de verdade e desafio.")
    .addStringOption(option =>
      option
        .setName("nivel")
        .setDescription("Nível das perguntas")
        .setRequired(true)
        .addChoices(
          { name: '-18', value: '-18' },
          { name: '+18', value: '+18' },
        )),
  execute(interaction) {

    const option = interaction.options.getString("nivel");

    if (option == "-18") {
      return interaction.reply({
        content: vdds.me18[Math.floor(Math.random() * vdds.me18.length + 1) - 1]
      });
    } else if (option == "+18") {
      if (interaction.channel.nsfw) {
        return interaction.reply({
          content:
            vdds.ma18[Math.floor(Math.random() * vdds.ma18.length + 1) - 1]
        });
      } else {
        return interaction.reply({
          content: "Só posso enviar esse tipo de mensagem em canal NSFW",
          ephemeral: true
        });
      }
    }
  }
};
