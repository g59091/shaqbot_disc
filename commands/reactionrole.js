const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "reactionrole",
  description: "This command enables a role selection ",
  async execute(message, args, client) {
    const channel = message.guild.channels.cache.find(channel => channel.name === "🤖-shaqbot-testing").id;
    const shadowRealmRole = message.guild.roles.cache.find(role => role.name === "Shadow Realm");
    const dummyRole = message.guild.roles.cache.find(role => role.name === "Dummy Role");

    const shadowRealmEmoji = "<:ritz_carlton:743252350206214194>";
    const dummyRoleEmoji = "<a:weekend_smoke:1071255034429452348>";
    const shadowRealmEmoji_raw = "ritz_carlton";
    const dummyRoleEmoji_raw = "weekend_smoke";

    const reactionEmbed = new EmbedBuilder()
        .setColor("#b6d7a8")
        .setTitle("Choose a role ")
        .setDescription("Choosing a role will give you that role dummy\n "
            + `${shadowRealmEmoji} for Shadow Realm\n`
            + `${dummyRoleEmoji} for Dummy Role`);

    const messageEmbed = await message.channel.send({ embeds: [reactionEmbed] });
    messageEmbed.react(shadowRealmEmoji);
    messageEmbed.react(dummyRoleEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch;
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.message.channel.id == channel) { 
        console.log(reaction.emoji.name + "channel react detected");   
        if (reaction.emoji.name === shadowRealmEmoji_raw) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(shadowRealmRole);
        }
        if (reaction.emoji.name === dummyRoleEmoji_raw) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(dummyRole);
        }
    } else {
        return;
    }

    });


    client.on("messageReactionRemove", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch;
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === shadowRealmEmoji_raw) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(shadowRealmRole);
            }
          if (reaction.emoji.name === dummyRoleEmoji_raw) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(dummyRole);
            }
        } else {
            return;
      }
        
    });
  }
}