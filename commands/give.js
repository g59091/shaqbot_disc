const shaqModel = require("../models/shaqschema");
module.exports = {
    name: 'give',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    cooldown: 10,
    description: ' give sCoins to a member ',
    async execute(message, args , client, profileInfo) {
        if (!args.length) return message.channel.send("You need to mention a player to give them coins");
        const amount = args[1];
        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist");
        if (amount % 1 != 0 || amount <= 0) return message.channel.send("amount must be a whole number");
        try {
            const targetData = await shaqModel.findOne({ userId: target.id });
            if (!targetData) return message.channel.send(`This user doens't exist in the db`);
            await shaqModel.findOneAndUpdate(
                { userId: target.id },
                { $inc: { sCoins: amount }}
            );
            return message.channel.send(`This player has been given ${amount} sCoins!`);
        } catch (err) {
            console.log(err);
        }
    },
};