const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    const { client } = interaction;

    console.log(
      `${interaction.user.tag} em #${interaction.channel.name}: ${interaction.commandName}`
    );

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Houve um erro durante a execução desse comando.",
        ephemeral: true
      });
    }

    //=== logs
    let opts = [];
    for (let i = 0; i < interaction.options._hoistedOptions.length; i++) {
      opts.push(interaction.options._hoistedOptions[i].value);
    }

    const logChannel = client.channels.cache.get(config.logsChannel.slashLogId),
      embed = new Discord.MessageEmbed()
        .setColor(config.botConfig.themeColor)
        .setThumbnail(
          interaction.guild.iconURL({
            dynamic: true,
            format: "png",
            size: 1024
          })
        )
        .addField(
          "Autor:",
          "<@" + interaction.user.id + "> - (`" + interaction.user.id + "`)"
        )
        .addField("Comando:", `${interaction.commandName} ${opts.join(" ")}`)
        .addField("Id da mensagem/comando:", `${interaction.id}`)
        .addField(
          "Canal:",
          interaction.channel.name + ` - (${interaction.channel.id})`
        )
        .addField(
          "Servidor:",
          interaction.guild.name + ` - (${interaction.guild.id})`
        )
        .setFooter(
          `Horário de uso: ${new Date().getUTCHours() -
            5}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`
        );
    logChannel.send({ embeds: [embed] });

    //=== logs
  }
};
