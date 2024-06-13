const shaqModel = require("../models/shaqschema");

module.exports = {
    name: "old_search",
    aliases: [],
    permissions: [],
    description: "Search for some coin!",
    async execute(message, args, client, profileInfo) {
        if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
        const locations = [
            "car",
            "bathroom",
            "park",
            "truck",
            "pocket",
            "computer"
        ];
        const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);
        const filter = (userMessage) =>  message.author == userMessage.author && chosenLocations.some((location) => location.toLowerCase() == userMessage.content.toLowerCase());
        //console.log(filter);
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 25000 });
        //console.log(collector);
        const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        collector.on('collect', async (m) => {
            console.log(m.author);
            if (m.content && m.author.username != "ShaqBot") {
                message.channel.send(`You found ${earnings} coins!`);
                await shaqModel.findOneAndUpdate(
                    { userId: message.author.id},
                    { $inc: { sCoins: earnings }}
                );
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                message.channel.send('You ran out of time!');
            }
        });
        message.channel.send(`<@${message.author.id}> Which location would you like to search?\n Type the location in this channel\n \`${chosenLocations.join('` `')}\``);
    }
}