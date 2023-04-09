const { Client, Events, GatewayIntentBits } = require("discord.js");
const { disc_bot_token } = require('./c.json');

// new instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// bot log on start
client.once("ready", () => {
  console.log("ShaqBot up & running!")
})

// bot actions
const prefix = ";"
client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot)
    return;
  const args = message.content.slice(prefix.length).split(/ +/);
})

// login using token
client.login(disc_bot_token)