const Discord = require("discord.js"),
  config = require("../config.json"),
  { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    const { client } = member;
    console.log(member);
  }
};
