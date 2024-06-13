module.exports = {
  name: "old_ban",
  description: "This command bans a specified user.",
  permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  execute(message, args) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
    const member = message.mentions.users.first();
    const memberTarget = message.guild.members.cache.get(member.id);
    
    // check member username for test ban
    if (memberTarget.user.username == "Rythm") {
      memberTarget.ban();
      message.channel.send("User was successfully banned.");
    }
  }
}