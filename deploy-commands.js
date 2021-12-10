module.exports = client => {
  const fs = require("fs");
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v9");
  const config = require("./config.json");

  const commands = [];
  const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "9" }).setToken(process.env.token);

  rest
    .put(Routes.applicationCommands(config.botConfig.clientId), {
      body: commands
    })
    .then(() => console.log("Sucesso ao registrar [SLASH_COMMANDS]"))
    .catch(console.error);
};
