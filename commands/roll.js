// first: grab length of directory in shaq_gacha_pics
// Second: grab 2-3 random cards from shaq_gacha_pics
// Third: when user clicks on card, associate picture path with scards string array in schema
//const shaqModel = require("../models/shaqschema");
const Canvas = require('@napi-rs/canvas');
const path = require("path");
const fs = require("fs");
const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: 'roll',
    aliases: [],
    permissions: [],
    cooldown: 300,
    description: ' lets the user roll for sCards ',
    async execute(message, args, client, profileInfo) {
        if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
        const gachaDir = path.resolve() + path.sep + "media" + path.sep + "shaq_gacha_pics";
        const backgroundJpg = path.resolve() + path.sep + "media" + path.sep + "background_test.jpg";
        const gachaFiles = fs.readdirSync(gachaDir);
        const cardsDropped = gachaFiles.sort(() => Math.random() - Math.random()).slice(0, 3);
        const sampleCanvas = Canvas.createCanvas(1500, 600);
        const sampleContext = sampleCanvas.getContext("2d");
        const sampleBackground = await Canvas.loadImage(backgroundJpg);
        sampleContext.drawImage(sampleBackground, 0, 0, sampleCanvas.width, sampleCanvas.height);
        var cardCount = 0;
        for (const card of cardsDropped) {
          const cardImage = await Canvas.loadImage(gachaDir + path.sep + card);
          // assume file name ends in .jpg or .png
          const cardNoExt = card.slice(0, -4);
          //const cardWRatio = cardImage.width / sampleCanvas.width;
          //const cardHRatio = cardImage.height / sampleCanvas.height;
          //sampleContext.drawImage(cardImage, 0, 0, cardImage.width, cardImage.height, cardCount + 100, 100, cardImage.width * cardRatio, cardImage.height * cardRatio);
          //console.log(300 * cardWRatio);
          sampleContext.drawImage(cardImage, cardCount + 100, 100, 400, 400);
          sampleContext.fillStyle =  "white";
          sampleContext.fillRect(cardCount + 100, 500, 400, 50);
          sampleContext.fillStyle =  "black";
          sampleContext.font = "40px Comic Sans MS";
          sampleContext.fillText(cardNoExt, cardCount + 250, 540); 
          cardCount += 450;
        }
        const sampleAttachment = new AttachmentBuilder(await sampleCanvas.encode("png"), {name: "background.png"});
        message.channel.send({files: [sampleAttachment]});
    }
}