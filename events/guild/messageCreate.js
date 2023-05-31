const { prefix, available_commands } = require('../../c.json');

module.exports = (client, message) => {  
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandProvided = args.shift().toLowerCase();

  const aliasCheck = client.commands.find(a => a.aliases && a.aliases.includes(commandProvided));

  // execute command if available 
  if (available_commands.includes(commandProvided))
    client.commands.get(commandProvided).execute(message, args, client);
  else if (aliasCheck) 
    aliasCheck.execute(message, args, client);
}
