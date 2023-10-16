// first: grab length of directory in shaq_gacha_pics
// Second: grab 2-3 random cards from shaq_gacha_pics
// Third: when user clicks on card, associate picture path with scards string array in schema
//const shaqModel = require("../models/shaqschema");
//const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
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
        const sampleCanvas = Canvas.createCanvas(1300, 768);
        const sampleContext = sampleCanvas.getContext("2d");
        const sampleBackground = await Canvas.loadImage(backgroundJpg);
        sampleContext.drawImage(sampleBackground, 0, 0, sampleCanvas.width, sampleCanvas.height);
        var cardCount = 0;
        for (const card of cardsDropped) {
          const cardImage = await Canvas.loadImage(gachaDir + path.sep + card);
          sampleContext.drawImage(cardImage, cardCount + 100, 100, 100, cardCount + 100);
          cardCount += 400;
        }

        const sampleAttachment = new AttachmentBuilder(await sampleCanvas.encode("png"), {name: "background.png"});
        message.channel.send({files: [sampleAttachment]});
        
        /* 
        const cardsSampleOne = new AttachmentBuilder(gachaDir + path.sep + cardsDropped[0]);
        const cardsSampleTwo = new AttachmentBuilder(gachaDir + path.sep + cardsDropped[1]);
        const cardsSampleThree = new AttachmentBuilder(gachaDir + path.sep + cardsDropped[2]);
        message.channel.send({ files: [cardsSampleOne, cardsSampleTwo, cardsSampleThree] });
       */

    }
}