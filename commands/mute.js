const ms = require('ms');
module.exports = {
  name: "mute",
  description: "This command will mute a member timed or manually",
  execute(message, args) {
    const target =  message.mentions.users.first();
    if (!target)
      return message.channel.send("Please try again with a valid member argument.");

    const mainRole = message.guild.roles.cache.find(role => role.name === 'Dummy Role');
    const muteRole = message.guild.roles.cache.find(role => role.name === 'Shadow Realm');
    const memberTarget = message.guild.members.cache.get(target.id);

    // standard mute, permanent role change
    memberTarget.roles.remove(mainRole.id);
    memberTarget.roles.add(muteRole.id);
    if (!args[1]) return message.channel.send(`<@${memberTarget.user.id}> has been muted.`);

    // timed mute, based on seconds provided in second arg
    message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
    setTimeout(function() {
      memberTarget.roles.remove(muteRole.id);
      memberTarget.roles.add(mainRole.id);
      message.channel.send(`<@${memberTarget.user.id}> is no longer muted`);
    }, ms(args[1]));
  }
}