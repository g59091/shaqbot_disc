module.exports = {
    name: "ban",
    description: "this command bans specified user",

    execute(message, args){
        const member = message.mentions.users.first();
        // return message.reply(member);
        const memberTarget = message.guild.members.cache.get(member.id);
        // console.log(memberTarget.user.username);
        if(memberTarget.user.username == "Rythm"){
            memberTarget.ban();
            message.channel.send("user was successfully banned");
       }
    }

}