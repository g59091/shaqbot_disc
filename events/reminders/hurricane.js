const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const path = require("path");
const { request } = require("undici");
const { createWriteStream } = require("fs");

module.exports = async(client) => {
    const nhc_channel = client.channels.cache.find(c => c.name === '🌀-hurricane-watch');
    if(!nhc_channel) return console.info('hurricane channel does not exist!');
    const mediaPath = path.resolve() + path.sep + "media";
    
    var hurricaneNumber = 3;
    var mostRecentPart = 1;
    var hurricaneNumberString = hurricaneNumber.toString().padStart(2, "0");
    const currentYear = new Date().getFullYear();
    const hurricaneCode = "AL" + hurricaneNumberString + currentYear;
    const hurricaneFile = hurricaneCode + "_5day_cone_with_line_and_wind_" + mostRecentPart + ".png";
    const hurricaneMedia = mediaPath + path.sep + hurricaneFile;
    /*
        start mostRecentPart at 1;
        make full path of hurricaneMedia;
        check if hurricaneNumber and mostRecentPart are <= media;
        loop mostRecentPart until > hurricaneMedia;

        start hurricaneNumber at 1;
        hurricane
    */ 
    const mediaStream = createWriteStream(hurricaneMedia);
    const nhcRequest = await request(`https://www.nhc.noaa.gov/archive/${currentYear}/graphics/${hurricaneCode}/${hurricaneFile}`, { method: "GET"});           
    /*
        if(nhcRequest.header["content-type"].startsWith("text/html"))
    */
    nhcRequest.body.pipe(mediaStream);
    mediaStream.on("error", (error) => {
        console.error("error saving the image", error);
    });

    mediaStream.on("finish", async () => {
        const hurricaneAttachment = new AttachmentBuilder(hurricaneMedia, {name: hurricaneFile});
        //const hurricaneEmbed = new EmbedBuilder()   
            //.setTitle("attachment")
            //.setImage(`attachment://${hurricaneFile}`);
            //embeds: [hurricaneEmbed] 
        await nhc_channel.send({ files: [hurricaneAttachment]});
    });
}
