//const util = require('minecraft-server-util');
const { request } = require("undici");
const { EmbedBuilder } = require("discord.js");
const { our_server_ip } = require("../c.json");
 
module.exports = {
  name: 'mcserver',
  aliases: ["mc", "mcs", "minecraft"],
  cooldown: 10,
  description: 'get information about a minecraft server',
  async execute(message, args , client){
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
    if (!args[0]) return message.channel.send('Please enter a minecraft server ip');
    var mcaddress = args[0];
    
    if (args[0] == "ours")
      mcaddress = our_server_ip;
    else {
      if (!args[1]) return message.channel.send('Please enter a minecraft server port');
      mcaddress.concat(":", args[1]);
    }
    
    const mcstatus = await request(`https://api.mcstatus.io/v2/status/java/${mcaddress}`, { method: "GET"});
    const mcbody = await mcstatus.body.json();
    if (!mcbody) return message.channel.send("mcstatus.io couldn't find the server");

    const mcEmbed = new EmbedBuilder()
      .setColor('#BFCDEB')
      .setTitle('MC Server Status')
      .addFields(
        {name: 'Server IP', value:  (mcaddress == our_server_ip) ? "hidden" : mcbody.host},
        {name: 'Online Players', value: mcbody.players.online.toString()},
        {name: 'Version', value: mcbody.version.name_clean.toString()}
      )
    message.channel.send({embeds: [mcEmbed]});
  }
}