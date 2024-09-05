import jdata from "../c.json" assert { type: "json" };
const { server_id } = jdata;

// timer for eight minutes
const timerMinutes = 8;

export default async (client) => {
  const guild = client.guilds.cache.get(server_id);
    
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channelId = guild.channels.cache.find(channel => channel.name.startsWith("Member Count:")).id;
    const channel = guild.channels.cache.get(channelId);
    channel.setName(`Member Count: ${memberCount.toLocaleString()}`);
    console.debug("Updating Member Count");
  }, timerMinutes * 60 * 1000);
};