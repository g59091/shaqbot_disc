const { Client, Events, GatewayIntentBits } = require("discord.js");
const { disc_bot_token } = require('./c.json');

// new instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

// client log
client.once("ready", () => {
  console.log("ShaqBot up & running!")
})

// login using token
client.login(disc_bot_token)