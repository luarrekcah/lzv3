const { SlashCommandBuilder } = require("@discordjs/builders"),
  config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Desenvolvedor apenas"),
  execute(interaction) {
    if (interaction.user.id != config.botConfig.devId)
      return interaction.reply({
        content: "Ei, bobinhx! Este comando é apenas para o desenvolvedor.",
        ephemeral: true
      });
    interaction
      .reply({
        content: "Certo, estarei reiniciando neste momento.",
        ephemeral: true
      })
      .then(() => {
        setTimeout(() => {
          process.exit(1);
        }, 5000);
      });
  }
};
