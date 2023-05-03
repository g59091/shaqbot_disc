module.exports = {
  name: "ban",
  description: "This command bans a specified user.",
  execute(message, args) {
    const member = message.mentions.users.first();
    const memberTarget = message.guild.members.cache.get(member.id);
    // check member username for test ban
    if (memberTarget.user.username == "Rythm") {
      memberTarget.ban();
      message.channel.send("User was successfully banned.");
    }
  }
}