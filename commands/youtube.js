module.exports={
    name: "youtube",
    description : "this command leads to a mystery youtube video",
    execute(message, args){

        let role = message.guild.roles.cache.find(r => r.name === "Fecal Personnel");

        if (role) 
        {
            message.channel.send("You're brown.");
        }
        else {
            message.channel.send("https://www.youtube.com/watch?v=MFsoZ__2WzQ");
        }
    }
}