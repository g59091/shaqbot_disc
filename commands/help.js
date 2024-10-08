import jdata from "../c.json" assert { type: "json" };
const { available_commands } = jdata;
import { EmbedBuilder } from "discord.js";

export default {
  name: "help",
  // aliases: ["hel"],
  description: "display available commands",
  cooldown: 2.5,
  async execute(message, args, client) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel");
    const helpEmbed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle("Commands")
      .setDescription("Here are the available commands");
    for (const command of available_commands)
      if (!(["mystery", "ban", "mute", "kick"].includes(command)))
        helpEmbed.addFields({name: "\u200B", value: command, inline: true});
    return message.channel.send({embeds: [helpEmbed]});
    //return message.channel.send(`Available commands: ${available_commands}`);
  }
};