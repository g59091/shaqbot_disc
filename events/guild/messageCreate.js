const { prefix, available_commands, all_permissions } = require('../../c.json');
const { Collection, PermissionsBitField } = require("discord.js");
const shaqModel = require("../../models/shaqschema");

const cooldowns = new Map();
module.exports = async (client, message) => {  
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandProvided = args.shift().toLowerCase();
  var commandGet = client.commands.find(a => a.aliases && a.aliases.includes(commandProvided));
  if (!commandGet && available_commands.includes(commandProvided))
    commandGet = client.commands.get(commandProvided); 
  
  // handle: shaqSchema data for each profile
  var profileInfo;
  try {
    profileInfo = await shaqModel.findOne({ userId: message.author.id });
    if (!profileInfo) {
      var profileNew = await shaqModel.create({ 
        userId: message.author.id,
        serverId: message.guild.id,
        sCoins: 25,
        bank: 0
       });
       profileNew.save();
    }
  } catch(err) {
    console.log(err);
  }

  // handle: user invalid/valid perms
  if ("permissions" in commandGet) {
    let invalidPerms = []
    for (const [perm, permValue] of Object.entries(PermissionsBitField.Flags)) {
      if (!all_permissions.includes(perm))
        return console.log(`Invalid Permissions ${perm}`);
      if (!message.member.permissions.has(perm))
        invalidPerms.push(perm);
    }

    if (invalidPerms.length)
      return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
  }

  // handle: user command cooldowns
  if (!cooldowns.has(commandGet.name))
    cooldowns.set(commandGet.name, new Collection());

  const current_time = Date.now();
  const time_stamps = cooldowns.get(commandGet.name);
  const cooldown_amount = (commandGet.cooldown) * 1000;

  if (time_stamps.has(message.author.id)) {
    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;
      return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${commandGet.name}`);
    }
  }

  // set: time for user based on current time
  time_stamps.set(message.author.id, current_time);
  // delete: time for user once cooldown over
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

  // handle: passing the command parameter for music commands 
  try {
    const musicCommands = ["play", "skip", "stop"];
    if (musicCommands.includes(commandProvided))
      commandGet.execute(message, args, client, commandProvided, profileInfo);
    else
      commandGet.execute(message, args, client, profileInfo);
  } 
  catch (err) {
    message.reply("There was an error trying to execute this command!");
    console.log(err);
  }
}
