const shaqModel = require("../models/shaqschema");
module.exports = {
    name: 'old_deposit',
    aliases: ["dep"],
    permissions: [],
    cooldown: 10,
    description: ' deposits sCoins to your bank ',
    async execute(message, args , client, profileInfo) {
        if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send(" Deposit amount must be a whole number");
        try {
            if (amount > profileInfo.sCoins) return message.channel.send("You dont have that amount of sCoins to deposit");
            await shaqModel.findOneAndUpdate(
                { userId: message.author.id },
                { $inc: { sCoins: -amount, bank: amount }}
            );
            return message.channel.send(`You deposited ${amount} sCoins into your bank`);
        } catch (err) {
            console.log(err);
        }
    },
};
