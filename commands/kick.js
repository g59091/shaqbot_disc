module.exports = {
    name: "kick",
    description: "this command kicks specified user",

    execute(message, args){
        const member = message.mentions.users.first();
        // return message.reply(member);
        const memberTarget = message.guild.members.cache.get(member.id);
        // console.log(memberTarget.user.username);
        if(memberTarget.user.username == "Rythm"){
            memberTarget.kick();
            message.channel.send("user was successfully kicked");
       }
    }

}