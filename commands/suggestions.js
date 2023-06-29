const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "suggestions",
    aliases: ["suggest", "sugma"],
    permissions: [],
    cooldown: 2,
    description: "creates a suggestion in the suggestion channel",

     async execute(message, args, client) {
        const sug_channel = message.guild.channels.cache.find(c => c.name === '🤔-suggestions');
        if(!sug_channel) return message.channel.send('suggestions channel does not exist!');
        
        let messageArgs = args.join(' ');
        const suggestionEmbed = new EmbedBuilder()
            .setColor("#b6d7a8")
            .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setDescription(messageArgs)

        const messageEmbed = await sug_channel.send({ embeds: [suggestionEmbed] }).then((msg) => {
            message.delete();
            msg.react(`👍`);
            msg.react(`👎`);
        }).catch((err)=>{
            throw err;
        }); 
    }
}