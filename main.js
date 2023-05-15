const { Client, Events, GatewayIntentBits, Collection, Partials } = require("discord.js");
const { disc_bot_token } = require('./c.json');
const memberCounter = require("./counters/membercounter.js");
const prefix = ";"

// new client instance
const client = new Client({intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMembers, 
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates

]}, {partials: [
  Partials.Message, 
  Partials.Channel,
  Partials.Reaction
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
  console.log("ShaqBot up & running!");
  memberCounter(client);
});

// on client run
client.on("messageCreate", message => {
  if (!message.content.startsWith(prefix) || message.author.bot)
    return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandProvided = args.shift().toLowerCase();
  const availableCommands = [
    "youtube", "clear", "rules", "kick",
    "ban", "mute", "reactionrole", "play", "stop"
  ];
  // execute command if available 
  if (availableCommands.includes(commandProvided))
    client.commands.get(commandProvided).execute(message, args, client);
});

// on client join
client.on("guildMemberAdd", guildMember => {
  const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === "Shadow Realm");
  guildMember.roles.add(welcomeRole);
  var testingChannel = guildMember.guild.channels.cache.find(channel => channel.name === "🤖-shaqbot-testing").id;
  guildMember.guild.channels.cache.get(testingChannel).send(`Welcome,go fuck yourself <@${guildMember.user.id}>`);
});

// login using token
client.login(disc_bot_token)