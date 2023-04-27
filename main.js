const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { disc_bot_token } = require('./c.json');
const prefix = ";"

// new client instance
const client = new Client({intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMembers, 
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent
]});

// read commands folder for bot commands list
const fs = require("fs");
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// on client startup
client.once("ready", () => {
  console.log("ShaqBot up & running!")
})

// on client run
client.on("messageCreate", message => {
  if (!message.content.startsWith(prefix) || message.author.bot)
    return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandProvided = args.shift().toLowerCase();
  const availableCommands = [
    "youtube", "clear", 
    "rules", "kick", "ban", "mute",
  ]
  // execute command if available 
  if (availableCommands.includes(commandProvided))
    client.commands.get(commandProvided).execute(message, args);
})

// login using token
client.login(disc_bot_token)