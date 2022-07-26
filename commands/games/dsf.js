const { SlashCommandBuilder } = require("@discordjs/builders"),
  config = require("../../config.json"),
  dsf = require("../../data/dsfs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dsf")
    .setDescription("Um desafio aleatório de verdade ou desafio.")
    .addStringOption(option =>
      option
        .setName("nivel")
        .setDescription("Nível dos desafios")
        .setRequired(true)
        .addChoices(
          { name: '-18', value: '-18' },
          { name: '+18', value: '+18' },
        )),
  execute(interaction) {
    const option = interaction.options.getString("nivel");

    if (option == "-18") {
      return interaction.reply({
        content: dsf.me18[Math.floor(Math.random() * dsf.me18.length + 1) - 1]
      });
    } else if (option == "+18") {
      if (interaction.channel.nsfw) {
        return interaction.reply({
          content: dsf.ma18[Math.floor(Math.random() * dsf.ma18.length + 1) - 1]
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
