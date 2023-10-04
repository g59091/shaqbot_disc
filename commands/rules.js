const { EmbedBuilder } = require("discord.js");
module.exports = {
  name : "rules",
  description : "rules for the bruh server",
  execute(message, args) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
    const rulesEmbed = new EmbedBuilder()
      .setColor('#26b5a7')
      .setTitle("Rules")
      .setDescription("Here are the rules for the bruh server")
      .addFields(
        {name: "Rule 1", value: "Be nice :3"},
        {name: "Rule 2", value: "juju on that beat.mp3"}
      )
      .setImage("https://cdn.discordapp.com/attachments/572972111706980353/1097703702409793616/computer_times.jpg")
      .setFooter({text: "Make sure to read all the rules big nose dummy"});
    message.channel.send({embeds: [rulesEmbed]});
  }
}