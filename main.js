const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { disc_bot_token } = require('./c.json');


// new instance
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// requests command files in directory commands
const fs = require("fs");
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name,command);
}

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

  if(command == "youtube"){
    client.commands.get("youtube").execute(message, args);
  }
 


})

// login using token
client.login(disc_bot_token)