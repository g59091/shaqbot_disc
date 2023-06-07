const { prefix, available_commands } = require('../../c.json');
const { Collection } = require("discord.js");
   
const cooldowns = new Map();
module.exports = (client, message) => {  
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandProvided = args.shift().toLowerCase();
  const commandGet = client.commands.find(a => a.aliases && a.aliases.includes(commandProvided));
  if (!commandGet && available_commands.includes(commandProvided))
    commandGet = client.commands.get(commandProvided); 

  if(!cooldowns.has(commandGet.name)){
    cooldowns.set(commandGet.name, new Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(commandGet.name);
  const cooldown_amount = (commandGet.cooldown) * 1000;

  if(time_stamps.has(message.author.id)){
    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    if(current_time < expiration_time){
      const time_left = (expiration_time - current_time) / 1000;
      return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${commandGet.name}`);
    }
  }

  //If the author's id is not in time_stamps then add them with the current time.
  time_stamps.set(message.author.id, current_time);
  //Delete the user's id once the cooldown is over.
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

  try{
    // execute command if available 
    commandGet.execute(message, args, client);
  } 
  catch (err){
      message.reply("There was an error trying to execute this command!");
      console.log(err);
  }
}
