const { Client, Events, GatewayIntentBits, Collection, Partials } = require("discord.js");
const { disc_bot_token } = require('./c.json');
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

client.commands = new Collection();
client.events = new Collection();

["command_handler", "event_handler"].forEach(handler =>{
  require(`./handlers/${handler}`)(client);
})

// login using token
client.login(disc_bot_token)