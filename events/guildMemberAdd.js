const Discord = require("discord.js"),
  config = require("../config.json"),
  { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "guildMemberAdd",
  async execute(guildMemberAdd) {
    const { client } = guildMemberAdd;
    console.log(guildMemberAdd);
  }
};
