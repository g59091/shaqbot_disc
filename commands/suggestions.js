const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "suggestions",
    aliases: ["suggest"],
    permissions: [],
    cooldown: 2,
    description: "creates a suggestion in the suggestion channel",

     async execute(message, args, client) {
        const channel = message.guild.channels.cache.find(c => c.name === '🤔-suggestions');
        if(!channel) return message.channel.send('suggestions channel does not exist!');

        let messageArgs = args.join(' ');
        const suggestionEmbed = new EmbedBuilder()
            .setColor("#b6d7a8")
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(messageArgs)
        /*const messageEmbed = await message.channel.send({ embeds: [reactionEmbed] });
        messageEmbed.react(shadowRealmEmoji);
        messageEmbed.react(dummyRoleEmoji);*/

        const messageEmbed = await message.channel.send({ embeds: [suggestionEmbed] }).then((msg) => {
            message.delete();
        }).catch((err)=>{
            throw err;
        }); 
        messageEmbed.react("👍");
        messageEmbed.react("👎");
    }
}