module.exports = {
  name: "kick",
  description: "This command kicks a specified user.",
  execute(message, args) {
    const member = message.mentions.users.first();
    const memberTarget = message.guild.members.cache.get(member.id);
    // check member username for test kick
    if (memberTarget.user.username == "Rythm") {
      memberTarget.kick();
      message.channel.send("User was successfully kicked.");
    }
  }
}