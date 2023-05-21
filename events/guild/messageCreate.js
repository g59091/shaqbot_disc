const prefix = ";";
module.exports = (client, message) => {  
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandProvided = args.shift().toLowerCase();
    //console.log(commandProvided);
    const availableCommands = [
        "youtube", "clear", "rules", "kick",
        "ban", "mute", "reactionrole", "play", "stop"
    ];
    // execute command if available 
    if (availableCommands.includes(commandProvided))
        client.commands.get(commandProvided).execute(message, args, client);
    
}
