const shaqModel = require("../models/shaqschema");
module.exports = {
    name: 'beg',
    aliases: [],
    permissions: [],
    cooldown: 10,
    description: ' lets the user beg for sCoins ',
    async execute(message, args , client, profileInfo) {
        const randomNumber = Math.floor(Math.random() * 25) + 1;
        if (Math.random() < 0.5){
            const shaqResponse = await shaqModel.findOneAndUpdate(
                { userId: message.author.id },
                { $inc: { sCoins: randomNumber } }
            );
            return message.channel.send(` ${message.author.username}, you begged and recieved ${randomNumber}`);
        } 
        else {
            return message.channel.send(" no f u");
        }
    }
};