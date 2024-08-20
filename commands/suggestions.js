import { EmbedBuilder } from "discord.js";

export default {
  name: "suggestions",
  aliases: ["suggest", "sugma"],
  permissions: [],
  cooldown: 2,
  description: "creates a suggestion in the suggestion channel",

  async execute(message, args, client) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
    const sug_channel = message.guild.channels.cache.find(c => c.name === '🤔-server-suggestions');
    if (!sug_channel) return message.channel.send('suggestions channel does not exist!');
    
    let messageArgs = args.join(' ');
    const suggestionEmbed = new EmbedBuilder()
      .setColor("#b6d7a8")
      .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setDescription(messageArgs)

    await sug_channel.send({ embeds: [suggestionEmbed] }).then((msg) => {
      message.delete();
      msg.react(`👍`);
      msg.react(`👎`);
    }).catch((err)=>{
      throw err;
    }); 
  }
}