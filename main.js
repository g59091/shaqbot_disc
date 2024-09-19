import { Client, Events, GatewayIntentBits, Collection, Partials } from "discord.js";
import jdata from "./c.json" assert { type: "json" };
const { disc_bot_token, mongodb_srv } = jdata;
import mongoose from "mongoose";

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

// MongoDB DataBase Connection
mongoose.connect(mongodb_srv, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected: BND_DB...");
}).catch((err) => {
  console.log(err);
});

client.commands = new Collection();
client.events = new Collection();

async function handlers() {
  for (const handler of ["command_handler", "event_handler"]) {
    const module = await import(`./handlers/${handler}.js`);
    module.default(client);
  }
}
handlers().catch((err) => {
  console.error('Error in handlers:', err);
});

// login using token
client.login(disc_bot_token);