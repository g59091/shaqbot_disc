const shaqModel = require("../models/shaqschema");
module.exports = {
    name: 'beg',
    aliases: [],
    cooldown: 10,
    description: ' lets the user beg for sCoins ',
    async execute(message, args , client, profileInfo) {
        if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        if (Math.random() < 0.1){
            const shaqResponse = await shaqModel.findOneAndUpdate(
                { userId: message.author.id },
                { $inc: { sCoins: randomNumber } }
            );
            return message.channel.send(` ${message.author.username}, you begged and recieved $${randomNumber}.00`);
        } 
        else {
            return message.channel.send(" no f u");
        }
    }
};