const { SlashCommandBuilder } = require("@discordjs/builders"),
  Canvas = require("canvas"),
  config = require("../../config.json"),
  Discord = require("discord.js"),
  canvas = Canvas.createCanvas(900, 500),
  ctx = canvas.getContext("2d"),
  { AttachmentBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com Pong!"),
  async execute(interaction) {
    const { client } = interaction,
      clientID = client.users.cache.get(config.botConfig.clientId),
      clientAvatar =  `https://cdn.discordapp.com/avatars/${clientID.id}/${clientID.avatar}.png`

    let totalSeconds = client.uptime / 1000,
      days = Math.floor(totalSeconds / 86400),
      hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60),
      seconds = totalSeconds % 60;

    const uptime = `à ${days.toFixed() == 0 ? "" : days.toFixed() + "D "}${
      hours.toFixed() == 0 ? "" : hours.toFixed() + "H "
    }${minutes.toFixed() == 0 ? "" : minutes.toFixed() + "M "}${
      seconds.toFixed() == 0 ? "" : seconds.toFixed() + "S"
    }`;

    const aguarde = await interaction.reply({
      content:
        "<a:alerta:758339902386733098> | Aguarde, estou coletando minhas informações, pode demorar um pouco...",
      fetchReply: true
    });

    const latenciaSV = aguarde.createdTimestamp - interaction.createdTimestamp;

    const api = Math.round(client.ws.ping);

    const cpu = Number((process.cpuUsage().system / 1024 / 1024).toFixed(2));

    const ram = Number((process.memoryUsage().rss / 1024 / 1024).toFixed(2));

    if (cpu > 0.0 && cpu <= 20.0) {
      const cpuConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-0a20.png?v=1618859808933"
      );
      ctx.drawImage(cpuConter, 0, 0, canvas.width, canvas.height);
    } else if (cpu > 20.0 && cpu <= 49.0) {
      const cpuConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-20a40.png?v=1619096005000"
      );
      ctx.drawImage(cpuConter, 0, 0, canvas.width, canvas.height);
    } else if (cpu > 50.0 && cpu <= 69.0) {
      const cpuConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-50a70.png?v=1619466083554"
      );
      ctx.drawImage(cpuConter, 0, 0, canvas.width, canvas.height);
    } else if (cpu > 70.0 && cpu <= 84.0) {
      const cpuConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-70a85.png?v=1619466508299"
      );
      ctx.drawImage(cpuConter, 0, 0, canvas.width, canvas.height);
    } else if (cpu > 85.0 && cpu <= 94.0) {
      const cpuConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-85a95.png?v=1619467131099"
      );
      ctx.drawImage(cpuConter, 0, 0, canvas.width, canvas.height);
    } else if (cpu > 95.0 && cpu <= 100.0) {
      const cpuConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-95a100.png?v=1619467447473"
      );
      ctx.drawImage(cpuConter, 0, 0, canvas.width, canvas.height);
    } else {
      const cpuConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-95a100.png?v=1619467447473"
      );
      ctx.drawImage(cpuConter, 0, 0, canvas.width, canvas.height);
      const cpuConterMax = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fcpu-max.png?v=1618862070497"
      );
      ctx.drawImage(cpuConterMax, 0, 0, canvas.width, canvas.height);
    }

    await interaction.editReply("CPU Coletada.");

    await interaction.editReply("Coletando RAM.");
    if (ram > 0.0 && ram <= 50.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-0a50.png?v=1618863900465"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 51.0 && ram <= 100.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-51a100.png?v=1618863904616"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 101.0 && ram <= 150.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-101a150.png?v=1618863900833"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 151.0 && ram <= 250.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-201a250.png?v=1618863904383"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 251.0 && ram <= 300.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-251a300.png?v=1618863901184"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 301.0 && ram <= 350.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-301a350.png?v=1618863901858"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 351.0 && ram <= 400.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-351a400.png?v=1618863903030"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 401.0 && ram <= 500.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-401a500.png?v=1618863902517"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else if (ram > 501.0 && ram <= 512.0) {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-501a510.png?v=1618863903542"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
    } else {
      const ramConter = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-501a510.png?v=1618863903542"
      );
      ctx.drawImage(ramConter, 0, 0, canvas.width, canvas.height);
      const max = await Canvas.loadImage(
        "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2Fram-max.png?v=1618863903298"
      );
      ctx.drawImage(max, 0, 0, canvas.width, canvas.height);
    }

    await interaction.editReply("RAM coletada.");
    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2FLuarzito-icone.png?v=1618859356665"
    );

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "20px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${uptime}`,
      canvas.width / 7.0, //Quanto menor, mais pra direita
      canvas.height / 1.06 //1.5 quanto menos, baixo
    );

    ctx.font = "20px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${latenciaSV}ms`,
      canvas.width / 3.0, //Quanto menor, mais pra direita
      canvas.height / 3.25 //1.5 quanto menos, baixo
    );

    ctx.font = "20px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${api}ms`,
      canvas.width / 3.25, //Quanto menor, mais pra direita
      canvas.height / 5.25 //1.5 quanto menos, baixo
    );

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const iconPrincipal = await Canvas.loadImage(clientAvatar);
    ctx.drawImage(iconPrincipal, 25, 25, 200, 200);

    await interaction.editReply("Painel quase pronto...");

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'ping.png' });

    return interaction.followUp({ files: [attachment] });
  }
};
