const { Client, Events, GatewayIntentBits } = require("discord.js");
const { disc_bot_token } = require('./c.json');

// new instance
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// bot log on start
client.once("ready", () => {
  console.log("ShaqBot up & running!")
})

// bot actions
const prefix = ";"
client.on("messageCreate", message => {
  console.log("message is recieved");
  if (!message.content.startsWith(prefix) || message.author.bot)
  {
    console.log("message does not start with prefix");
    return;
  }


  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping')
  {
      //const channel = client.channels.cache.get('💦-cum-zone-general')
      message.channel.send('pong');
  }
  else if(command == 'bruh')
  {
      message.channel.send('server');
  }


})

// login using token
client.login(disc_bot_token)