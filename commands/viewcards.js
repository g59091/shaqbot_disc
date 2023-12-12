const shaqModel = require("../models/shaqschema");
const path = require("path");
const Canvas = require('@napi-rs/canvas');
const fs = require("fs");
const { AttachmentBuilder } = require('discord.js');
const { card_game_effects } = require("../c.json");
module.exports = {
    name: 'view',
    aliases: [],
    permissions: [],
    cooldown: 1,
    description: ' lets the user view specific Scard ',
    async execute(message, args, client, profileInfo) {
        if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel");
        if (!args.length) return message.channel.send("Second keyword needed BND"); 
        const gachaDir = path.resolve() + path.sep + "media" + path.sep + "shaq_gacha_pics";
        const backgroundJpg = path.resolve() + path.sep + "media" + path.sep + "background_portrait.jpg";
        const gachaFiles = fs.readdirSync(gachaDir); 
        var imageName = "";
        try{
          for (const file of gachaFiles) {
             if(file.slice(0, -4) == args[0].split("_")[0]) {
                 imageName = file;
              }}
        const imageDoc = await shaqModel.findOne(
            { userId: message.author.id , sCards: args[0]}
            );
            console.log(imageDoc);
          }
        catch(err) {
              console.log(err);
        }
        
        if(!imageName) return message.channel.send("image not in database dummy"); 
        const sampleCanvas = Canvas.createCanvas(900, 1600);
        const sampleContext = sampleCanvas.getContext("2d");
        const sampleBackground = await Canvas.loadImage(backgroundJpg);
        const cardImage = await Canvas.loadImage(gachaDir + path.sep + imageName);
        sampleContext.drawImage(sampleBackground, 0, 0, sampleCanvas.width, sampleCanvas.height);
        shaqCardEffect = Math.random() <= 0.000001 ? "poop" : "plain";
        cardEffectHelper(shaqCardEffect, sampleContext, cardImage);
      
        const sampleAttachment = new AttachmentBuilder(await sampleCanvas.encode("png"), {name: "background.png"});
        await message.channel.send({files: [sampleAttachment]});
        // have argument for view we want -> ;view (specific card name) 
        // Scan DB for argument name to get specific card
        // render specific card onto canvas backround
        // render same effects

    }
}
const cardEffectHelper = (cEffect, cContext , cImage) => {
//cContext.drawImage(cImage, cCount + 100, 100, 400, 400);
const effectList = Object.getOwnPropertyNames(card_game_effects);
//console.log(cEffect);
switch(cEffect) {
    //case effectList[0]: 
    //break;
    case effectList[1]:
    //console.log("effect has been found");
    cContext.drawImage(cImage, cCount + 100, 100, 400, 400);
    cContext.fillStyle = "rgba(139, 69, 19, 0.65)";
    cContext.fillRect(cCount + 100, 100, 400, 400);
    break;
    default: 
    cContext.drawImage(cImage,100, 100, 750, 750);
  }
} 

