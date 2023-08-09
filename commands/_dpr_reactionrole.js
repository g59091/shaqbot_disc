const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "old_reactionrole",
  description: "This command enables a role selection ",
  async execute(message, args, client) {
    const channel = message.guild.channels.cache.find(channel => channel.name === "🤖-shaqbot-testing").id;
    const shadowRealmRole = message.guild.roles.cache.find(role => role.name === "Shadow Realm");
    const dummyRole = message.guild.roles.cache.find(role => role.name === "Dummy Role");

    const shadowRealmEmoji = "<:ritz_carlton:743252350206214194>";
    const dummyRoleEmoji = "<a:weekend_smoke:1071255034429452348>";
    const shadowRealmEmoji_raw = "ritz_carlton";
    const dummyRoleEmoji_raw = "weekend_smoke";

    // Send out message with included emoji reactions
    const reactionEmbed = new EmbedBuilder()
      .setColor("#b6d7a8")
      .setTitle("Choose a role ")
      .setDescription("Choosing a role will give you that role, dummy.\n"
        + `${shadowRealmEmoji} for Shadow Realm\n`
        + `${dummyRoleEmoji} for Dummy Role`);
    const messageEmbed = await message.channel.send({ embeds: [reactionEmbed] });
    messageEmbed.react(shadowRealmEmoji);
    messageEmbed.react(dummyRoleEmoji);

    const reactionChecks = async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch;
      return (user.bot || !reaction.message.guild || 
        reaction.message.channel.id != channel) ? true : false
    }

    // on message reaction add
    client.on("messageReactionAdd", async (reaction, user) => {
      if (reactionChecks(reaction, user)) return;
      
      if (reaction.emoji.name === shadowRealmEmoji_raw)
        await reaction.message.guild.members.cache.get(user.id).roles.add(shadowRealmRole);
      if (reaction.emoji.name === dummyRoleEmoji_raw)
        await reaction.message.guild.members.cache.get(user.id).roles.add(dummyRole);
    });

    // on message reaction removal
    client.on("messageReactionRemove", async (reaction, user) => {
      if (reactionChecks(reaction, user)) return;

      if (reaction.emoji.name === shadowRealmEmoji_raw)
        await reaction.message.guild.members.cache.get(user.id).roles.remove(shadowRealmRole);
      if (reaction.emoji.name === dummyRoleEmoji_raw)
        await reaction.message.guild.members.cache.get(user.id).roles.remove(dummyRole);
    });
  }
}