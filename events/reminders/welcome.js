import { EmbedBuilder } from "discord.js";
import jdata from "../../c.json" assert { type: "json" };
const { base_role, server_id } = jdata;

// timer for 10 seconds
const timerSeconds = 10;

// todo: test new role 
export default async (client) => {
  const rule_channel = client.channels.cache.find(c => c.name === '📜-rules');
  const serverGuild = client.guilds.cache.get(server_id);
  const baseRole = serverGuild.roles.cache.find(role => role.name === base_role);

  // create if statement to check if shaq bot has already sent embed
  var ruleMessages = await rule_channel.messages.fetch({ limit: 1 });
  const shaqCheck = ruleMessages.filter(m => m.author.username === "ShaqBot").size;
  if (!(shaqCheck > 0)) {
    const rulesEmbed = new EmbedBuilder()
      .setColor("#b6d7a8")
      .setTitle(" Welcome to the official Bruh Server!")
      .setDescription(
        "Here are the rules for the server:\n\n" +
        "Rule 1: Be nice :3\n" +
        "Rule 2: juju on that beat.mp3\n\n" +
        "Choosing thumbs up will give you the scoundrels role, BND.\n" + 
        "I agree to the rules provided above.\n"
      );

    await rule_channel.send({ embeds: [rulesEmbed] }).then((msg) => {
      msg.react(`👍`);
      msg.react(`👎`);
    }).catch((err)=> {
      throw err;
    });
  }

  ruleMessages = await rule_channel.messages.fetch({ limit: 1 });
  const reactions = ruleMessages.first().reactions.cache;
  const thumbsUpEReaction = reactions.find(reaction => reaction.emoji.name === `👍`);
  // set interval check
  // check if user reacted to embed 
  // then give them the scoundrels role
  setInterval(async() => {
    if (!("users" in thumbsUpEReaction)) return;
    var allReactionUsers = await thumbsUpEReaction.users.fetch();
    var allServerUsers = await serverGuild.members.fetch();
    var allReactionUsernames = allReactionUsers.filter(user => user.username !== "ShaqBot").map(user => user.username);
    //console.log(allReactionUsernames);
    for (var reactUser of allReactionUsernames) {
      var reactUserId = allServerUsers.find(member => member.user.username === reactUser);
      //console.log(reactUserId);
      if (reactUserId) 
        await reactUserId.roles.add(baseRole);
    }
   }, timerSeconds * 1000);
};