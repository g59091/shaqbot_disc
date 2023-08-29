const shaqModel = require("../models/shaqschema");
module.exports = {
    name: 'withdraw',
    aliases: [],
    permissions: [],
    cooldown: 10,
    description: ' withdraws sCoins from your bank ',
    async execute(message, args , client, profileInfo) {
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send(" withdraw amount must be a whole number");
        try {
            if (amount > profileInfo.bank) return message.channel.send("You dont have enough sCoins in your bank to withdraw");
            await shaqModel.findOneAndUpdate(
                { userId: message.author.id },
                { $inc: { sCoins: amount, bank: -amount }}
            );
            return message.channel.send(`You withdrew ${amount} sCoins from your bank`);
        } catch (err) {
            console.log(err);
        }
    },
};