module.exports = {
    name: 'balance',
    aliases: ["bal"],
    permissions: [],
    cooldown: 10,
    description: 'get users Scoin balance',
    execute(message, args , client, profileInfo) {
        if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
        message.channel.send(` Your shit coin balance is ${profileInfo.sCoins} and your bank balance is ${profileInfo.bank}`);
    }
};