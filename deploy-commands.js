const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
require('dotenv').config();

const commands = [];
let count = 0;
console.log(__dirname);
fs.readdirSync('./commands').forEach((dir) => {
	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((files) => files.endsWith(".js"));
	console.log(commandFiles);
	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		commands.push(command.data.toJSON());
	}	
	count++;
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(config.botConfig.clientId), { body: commands })
	.then(() => console.log(`[GLOBAL] ${count} Comandos Registrados com Sucesso`))
	.catch(console.error);
  