import jdata from "../c.json" assert { type: "json" };
const { mystery_youtube } = jdata;

export default {
  name: "mystery",
  description : "This command leads to a mystery YouTube video.",
  execute(message, args) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
    var role = message.guild.roles.cache.find(r => r.name === "Shadow Realm");
    var mysteryItem = mystery_youtube[Math.floor(Math.random() * mystery_youtube.length)];
    if (role)
      message.channel.send("You're a BND.");
    else
      message.channel.send("https://www.youtube.com/watch?v=" + mysteryItem);
  }
};