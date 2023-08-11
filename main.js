const { Client, Events, GatewayIntentBits, Collection, Partials } = require("discord.js");
const { disc_bot_token, mongodb_srv } = require('./c.json');
const mongoose = require("mongoose");
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

// MongoDB DataBase Connection
mongoose.connect(mongodb_srv, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>{
  console.log("connected to DB BND");
}).catch((err) => {
  console.log(err);
});


// login using token
client.login(disc_bot_token)