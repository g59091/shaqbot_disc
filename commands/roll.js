// first: grab length of directory in shaq_gacha_pics
// Second: grab 2-3 random cards from shaq_gacha_pics
// Third: when user clicks on card, associate picture path with scards string array in schema
const shaqModel = require("../models/shaqschema");
const Canvas = require('@napi-rs/canvas');
const path = require("path");
const fs = require("fs");
const { AttachmentBuilder } = require('discord.js');
const { card_game_effects } = require("../c.json");

module.exports = {
  name: 'roll',
  aliases: [],
  permissions: [],
  cooldown: 1,
  description: ' lets the user roll for sCards ',
  async execute(message, args, client, profileInfo) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
    const gachaDir = path.resolve() + path.sep + "media" + path.sep + "shaq_gacha_pics";
    const backgroundJpg = path.resolve() + path.sep + "media" + path.sep + "background_test.jpg";
    const gachaFiles = fs.readdirSync(gachaDir);
    var cardsDropped = gachaFiles.sort(() => Math.random() - Math.random()).slice(0, 3);
    const sampleCanvas = Canvas.createCanvas(1500, 600);
    const sampleContext = sampleCanvas.getContext("2d");
    const sampleBackground = await Canvas.loadImage(backgroundJpg);
    sampleContext.drawImage(sampleBackground, 0, 0, sampleCanvas.width, sampleCanvas.height);
    var shaqCardName = "";
    var shaqCardEffect = "";

    // rendering three cards for roll
    var cardCount = 0;
    for (const card of cardsDropped) {
      const cardImage = await Canvas.loadImage(gachaDir + path.sep + card);
      // assume file name ends in .jpg or .png
      const cardNoExt = card.slice(0, -4);
      shaqCardEffect = Math.random() <= 0.2 ? "poop" : "plain";
      //sampleContext.drawImage(cardImage, cardCount + 100, 100, 400, 400);
      cardEffectHelper(shaqCardEffect, sampleContext, cardImage, cardCount);
      sampleContext.fillStyle =  "white";
      sampleContext.fillRect(cardCount + 100, 500, 400, 50);
      sampleContext.fillStyle =  "black";
      sampleContext.font = "40px Comic Sans MS";
      sampleContext.fillText(cardNoExt, cardCount + 250, 540); 
      cardCount += 450;
    } 
    //console.log(cardsDropped);
    const sampleAttachment = new AttachmentBuilder(await sampleCanvas.encode("png"), {name: "background.png"});
    const cardMesaage = await message.channel.send({files: [sampleAttachment]}).then((msg)  => {
      msg.react("1️⃣");
      msg.react("2️⃣");
      msg.react("3️⃣");
      return msg;
      }).catch((err)=> {
      throw err;
    });
    
    const channel = message.guild.channels.cache.find(channel => channel.name === "🤖-commands").id;
    // on message reaction add
    /*client.on("messageReactionAdd", async (reaction, user) => {
      if (cardsDropped == []) return;
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch;
      if (user.bot || !reaction.message.guild || 
        reaction.message.channel.id != channel) return;
      
      console.log("reaction was added");
      console.log(cardsDropped);
      switch (reaction.emoji.name) {
        case "1️⃣": 
          shaqCardName = cardsDropped[0].slice(0, -4) + shaqCardEffect;
          break;
        case "2️⃣":
          shaqCardName = cardsDropped[1].slice(0, -4) + shaqCardEffect;
          break;
        case "3️⃣":
          shaqCardName = cardsDropped[2].slice(0, -4) + shaqCardEffect;
          break;
        default: 
          message.channel.send("PLUG!!!");
      }
      //cardsDropped = [];
      //console.log(message.author.id);
      message.channel.send(`<@${message.author.id}> grabbed ${shaqCardName}`);
      try{
        await shaqModel.findOneAndUpdate(
          { userId: message.author.id },
          { $push: { sCards: shaqCardName}}
        );
      } catch(err) {
        console.log(err);
      }
    });*/

    const reactionFilter = async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch;
      if (user.bot || !reaction.message.guild || 
        reaction.message.channel.id != channel) return;

      //console.log(reaction.emoji.name);
      //console.log("test");
      return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) && user.id === message.author.id; // && user.id === interaction.user.id;
    };

    //console.log(message.author.id);
    /*const collector = cardMesaage.createReactionCollector({filter, time: 5000 });
    collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));*/

    cardMesaage.awaitReactions({ filter: reactionFilter, max: 1, maxUsers: 1, time: 10000, errors: ["time"]})
      .then((collected) => {
        return new Promise( async resolve => {
          const capReaction = collected.first();
          switch (capReaction.emoji.name) {
            case "1️⃣": 
              shaqCardName = cardsDropped[0].slice(0, -4) + shaqCardEffect;
              break;
            case "2️⃣":
              shaqCardName = cardsDropped[1].slice(0, -4) + shaqCardEffect;
              break;
            case "3️⃣":
              shaqCardName = cardsDropped[2].slice(0, -4) + shaqCardEffect;
              break;
            default: 
              message.channel.send("PLUG!!!");
          }
          message.channel.send(`<@${message.author.id}> grabbed ${shaqCardName}`);
          try {
            await shaqModel.findOneAndUpdate(
              { userId: message.author.id },
              { $push: { sCards: shaqCardName}}
            );
          } catch(err) {
            console.log(err);
          }
        });
      })
      .catch((collected) => {
          console.log(`after 10 seconds only ${collected.size} out of 4 reactions`);
      });
  }
}

const cardEffectHelper = (cEffect, cContext , cImage, cCount) => {
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
      cContext.drawImage(cImage, cCount + 100, 100, 400, 400);
  }
} 

