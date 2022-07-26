const { SlashCommandBuilder } = require("@discordjs/builders"),
  Discord = require("discord.js"),
  config = require("../../config.json")
  

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Desenvolvedor apenas")
    .addSubcommand(subcommand =>
      subcommand
        .setName("user")
        .setDescription("Informações de um usuário")
        .addUserOption(option =>
          option
            .setName("user")
            .setDescription("menção ao usuário")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("user_id")
        .setDescription("Informações de um usuário")
        .addStringOption(option =>
          option
            .setName("user_id")
            .setDescription("ID de um usuário")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName("server").setDescription("Informações do um servidor")
    ),
  async execute(interaction) {
    //verify
    if (interaction.user.id != config.botConfig.devId)
      return interaction.reply({
        content: "Ei, bobinhx! Este comando é apenas para o desenvolvedor.",
        ephemeral: true
      });
    //verify

    if (interaction.options.getSubcommand() === "user") {
      const user = interaction.options.getUser("user");
      return interaction.replay({
        content: "Em desenvolvimento",
        ephemeral: true
      });
      //user data
    } else if (interaction.options.getSubcommand() === "user_id") {
      return interaction.replay({
        content: "Em desenvolvimento",
        ephemeral: true
      });
      //user id data
    } else if (interaction.options.getSubcommand() === "server") {
      const server = interaction.guild;

      function checkBots(guild) {
        let botCount = 0;
        guild.members.cache.forEach(member => {
          if (member.user.bot) botCount++;
        });
        return botCount;
      }

      function checkMembers(guild) {
        let memberCount = 0;
        guild.members.cache.forEach(member => {
          if (!member.user.bot) memberCount++;
        });
        return memberCount;
      }

      function checkOnlineUsers(guild) {
        let onlineCount = 0;
        guild.members.cache.forEach(member => {
          if (member.user.presence.status === "online") onlineCount++;
        });
        return onlineCount;
      }

      function checkDndUsers(guild) {
        let dndCount = 0;
        guild.members.cache.forEach(member => {
          if (member.user.presence.status === "dnd") dndCount++;
        });
        return dndCount;
      }

      function checkIdleUsers(guild) {
        let idleCount = 0;
        guild.members.cache.forEach(member => {
          if (member.user.presence.status === "idle") idleCount++;
        });
        return idleCount;
      }

      function checkInvisibleUsers(guild) {
        let invisibleCount = 0;
        guild.members.cache.forEach(member => {
          if (member.user.presence.status === "invisible") invisibleCount++;
        });
        return invisibleCount;
      }
      let sicon = server.iconURL({
        dynamic: true,
        format: "png",
        size: 1024
      });

      const regiao = {
        brazil: ":flag_br: Brasil",
        europe: "Europa",
        hong_kong: "Hong Kong",
        india: "India",
        japan: "Japão"
      };
      const verificationLevel = {
        NONE: "Sem verificação",
        LOW: "Baixo",
        MEDIUM: "Médio",
        HIGH: "Alto",
        VERY_HIGH: "Ultra verificado pelo FBI :flushed:"
      };
      const nitro = {
        0: "https://www.nicepng.com/png/full/327-3278798_faq-logo-discord.png",
        1: "https://ponyvilleplaza.com/files/img/boost.png",
        2: "https://ponyvilleplaza.com/files/img/boost.png", //Colocar uma img de boost melhor
        3: "https://pbs.twimg.com/media/EWdeUeHXkAQgJh7.png"
      };
      const splash = `https://cdn.discordapp.com/splashes/${interaction.guild.id}/${interaction.guild.splash}.png?size=2048`;

      let serverembed = new Discord.MessageEmbed()
        .setAuthor(`${server.name} - Informações`, nitro[server.premiumTier])
        .setColor("#15f153")
        .addField(
          "👑Dono do servidor: ",
          "<@" +server.fetchOwner()+ "> (`" + server.fetchOwner().id + "`)",
          true
        )
        .addField("🌎Região do servidor: ", `d: regiao[server.region]`, true)
        .setThumbnail(sicon, true)
        .setImage(splash)
        .addField("💢Nome do servidor: ", server.name, true)
        .addField(
          "📛Nível de verificação: ",
          verificationLevel[server.verificationLevel],
          true
        )
        .addField("🗂Quantidade de canais: ", `d: server.channels.cache.size`, true)
        .addField("👪Total de membros: ", `d: server.memberCount`, true)
        .addField("😜Humanos: ", checkMembers(server), true)
        .addField("🤖Bots: ", checkBots(server), true)
        .addField("🟢Online", checkOnlineUsers(server), true)
        .addField("🔴Dnd", checkDndUsers(server), true)
        .addField("🟠Ausente", checkIdleUsers(server), true)
        .addField(
          "Total ON:",
          checkIdleUsers(server) +
            checkDndUsers(server) +
            checkOnlineUsers(server),
          true
        )
        .setFooter("🗓️Servidor criado em:")
        .setTimestamp(server.createdAt);

      return interaction.replay({
        content: "Em desenvolvimento",
        ephemeral: true
      });
      //server data
    } else if (interaction.options.getSubcommand() === "server_id") {
      return interaction.replay({
        content: "Em desenvolvimento",
        ephemeral: true
      });
      //server id data
    }
  }
};
