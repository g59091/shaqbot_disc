module.exports = {
    name: 'balance',
    aliases: ["bal"],
    permissions: [],
    cooldown: 10,
    description: 'get users scoin balance',
    execute(message, args , client, profileInfo) {
        message.channel.send(` Your shit coin balance is ${profileInfo.sCoins} and your bank balance is ${profileInfo.bank}`);
    }
};