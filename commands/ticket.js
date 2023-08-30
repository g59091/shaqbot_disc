const { ChannelType, PermissionsBitField } = require('discord.js');
const { ticket_category_id } = require('../c.json'); 
module.exports = {
    name: "ticket",
    aliases: [],
    description: "open a ticket!",
    async execute(message, args, client) {
      const ticketChannel = await message.guild.channels.create({
        name: `ticket: ${message.author.tag}`,
        type: ChannelType.GuildText,
        parent: ticket_category_id,
        permissionOverwrites: [
            {
                id: message.guild.id,
                deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
            },
            {
                id: message.author,
                allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
            }
        ]
      });
      const reactionMessage = await ticketChannel.send("Thank you for contacting support!");
  
      try {
        await reactionMessage.react("🔒");
        await reactionMessage.react("⛔");
      } 
      catch (err) {
        ticketChannel.send("Error sending emojis!");
        throw err;
      }
  
      const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).permissions.has(PermissionsBitField.Flags.Administrator),
        { dispose: true }
      );
  
      collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case "🔒":
            ticketChannel.permissionOverwrites.edit(message.author, { SendMessages: false });
            break;
          case "⛔":
            ticketChannel.send("Deleting this channel in 5 seconds!");
            setTimeout(() => ticketChannel.delete(), 5000);
            break;
        }
      });
  
      message.channel
        .send(`We will be right with you! ${ticketChannel}`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 7000);
          setTimeout(() => message.delete(), 3000);
        })
        .catch((err) => {
          throw err;
        });
    },
  };
  