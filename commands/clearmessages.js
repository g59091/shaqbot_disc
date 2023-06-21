module.exports = {
  name: "clear",
  description: "clear my messages",
  permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  execute(message, args) {
    if (!args[0] || isNaN(args[0]))
      return message.reply("please enter a real number");
    if (args[0] < 1 || args[0] > 5)
      return message.reply("please give a number from 1 to 5");
    
    // bulk delete
    message.channel.messages.fetch({limit: args[0]}).then(messages => {
      message.channel.bulkDelete(messages);
    });
  }
}