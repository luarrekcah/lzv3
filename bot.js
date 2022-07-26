module.exports = app => {
	const fs = require('node:fs');
	const path = require('node:path');
	const { Client, Collection, GatewayIntentBits } = require('discord.js');
	require('dotenv').config();

	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	client.commands = new Collection();

	let count = 0;
	fs.readdirSync('./commands').forEach((dir) => {
		const commandFiles = fs.readdirSync(`./commands/${dir}`).filter((files) => files.endsWith(".js"));
		console.log(commandFiles);
		for (const file of commandFiles) {
			const command = require(`./commands/${dir}/${file}`);
			client.commands.set(command.data.name, command);
		}
		count++;
	});

	console.log(`${count} Comandos Carregados`)

	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}

	client.login(process.env.TOKEN);
};