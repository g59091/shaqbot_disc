// const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
// const path = require("path");
// const { request } = require("undici");
// const { createWriteStream } = require("fs");
import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import path from "path";
import { request } from "undici";
import { createWriteStream } from "fs";

export default async(client) => {
  const nhc_channel = client.channels.cache.find(c => c.name === '🌀-hurricane-watch');
  if(!nhc_channel) return console.info('hurricane channel does not exist!');

  const maxHurrNum = 42;
  const mediaPath = path.resolve() + path.sep + "media";
  const currentYear = new Date().getFullYear();
  const hnStrFunc = (hurrNum) => hurrNum.toString().padStart(2, "0");

  // loop through all possible hurricanes instances possible for ATLANTIC area
  for (var i = 0; i < maxHurrNum; i++) 
  {
    // NHC hurricane code format: "ALXXYYYY", XX: two digit hurr. num & YYYY: current year
    var hurricaneCode = "AL" + hnStrFunc(i) + currentYear;
    var nhcRequest = {};    
    var partNum = 1;
    var mostRecentFlag = false;
    while (mostRecentFlag != true)
    {
      // make request to NHC for latest image part
      var nhcAPI = "https://www.nhc.noaa.gov/archive/" +
        currentYear + "/graphics/" + hurricaneCode + "/" + 
        hurricaneCode + "_5day_cone_with_line_and_wind_" + partNum + ".png";
      nhcRequest = await request(nhcAPI, {method: "GET"});
      /* WARNING: FOLLOWING AREA IS UNDER CONSTRUCTION. VIEWER DISCRETION IS ADVISED.
      // if image is received, increment 
      if (nhcRequest.headers["content-type"].startsWith("image/png")) {
          partNum += 1;
      }
      else {}
      */
    }

    if (!("headers" in nhcRequest)) continue;
    // save all of our files as "hurrricaneNumber_partNum_XYZ", XYZ: date pic was last modified from NHC
    var hurricaneFile = hnStrFunc(i) + "_" + partNum.toString() + "_" + nhcRequest.headers["last-modified"];
    // todo: bias based on recentness using Date found in NHC request
    //var nhcFileDate = new Date(nhcRequest.headers["last-modified"]);
    var hurricaneMedia = mediaPath + path.sep + hurricaneFile;
    var mediaStream = createWriteStream(hurricaneMedia);

    // create file and publish to channel
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
      //await nhc_channel.send({ files: [hurricaneAttachment]});
    });
  }
};
