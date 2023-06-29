const { server_id } = require('../c.json');
module.exports = async (client) =>{
  const guild = client.guilds.cache.get(server_id);
  // timer for five minutes
  const timerCheck = 300000;
  
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channelId = guild.channels.cache.find(channel => channel.name.startsWith("Member Count:")).id;
    const channel = guild.channels.cache.get(channelId);
    channel.setName(`Member Count: ${memberCount.toLocaleString()}`);
    console.debug("Updating Member Count");
  }, timerCheck);
}