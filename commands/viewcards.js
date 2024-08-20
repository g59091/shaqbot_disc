import shaqModel from "../models/shaqschema.js";
import path from "path";
import Canvas from "@napi-rs/canvas";
import fs from "fs";
import { AttachmentBuilder } from "discord.js";
import jdata from "../c.json" assert { type: "json" };
const { card_game_effects, card_game_quotes } = jdata;

export default {
  name: 'view',
  aliases: [],
  permissions: [],
  cooldown: 1,
  description: 'lets the user view specific Scard',
  async execute(message, args, client, profileInfo) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel");
    if (!args.length) return message.channel.send("Second keyword needed BND"); 
    const gachaDir = path.resolve() + path.sep + "media" + path.sep + "shaq_gacha_pics";
    const borderPng = path.resolve() + path.sep + "media" + path.sep + "card_boundary.png";
    const backgroundJpg = path.resolve() + path.sep + "media" + path.sep + "background_portrait.jpg";
    const gachaFiles = fs.readdirSync(gachaDir); 
    var imageName = "";
    var imageQuote = "N/A";
    var shaqCardName = "";
    var shaqCardEffect = "plain";
    var searchTerm = args[0];
    try { 
      const imageDoc = await shaqModel.findOne({ 
        userId: message.author.id ,
        sCardIds: searchTerm
      });
      //console.log(imageDoc);
      var cardIndex = imageDoc.sCardIds.indexOf(searchTerm);
      var sCardname = "";
      if (cardIndex != -1 ) {
        sCardname = imageDoc.sCards[cardIndex]
      }
      for (var file of gachaFiles) {
        if (file.slice(0, -4) == sCardname.split("_")[0]){
          imageName = file;
          shaqCardName = file.slice(0, -4);
          shaqCardEffect = sCardname.split("_")[1];
          //console.log(card_game_quotes);
          if (card_game_quotes.hasOwnProperty(shaqCardName))
            imageQuote = card_game_quotes[shaqCardName];
        }
      }
      //console.log(imageName);
    }
    catch(err) {
      console.log(err);
    }
    if(!imageName) return message.channel.send("image not in database dummy"); 
    const sampleCanvas = Canvas.createCanvas(1087, 1600);
    const sampleContext = sampleCanvas.getContext("2d");
    const sampleBackground = await Canvas.loadImage(backgroundJpg);
    const sampleBorder = await Canvas.loadImage(borderPng);
    const cardImage = await Canvas.loadImage(gachaDir + path.sep + imageName);
    sampleContext.drawImage(sampleBackground, 0, 0, sampleCanvas.width, sampleCanvas.height);
    //shaqCardEffect = Math.random() <= 0.000001 ? "poop" : "plain";
    cardEffectHelper(shaqCardEffect, sampleContext, cardImage);
    sampleContext.fillStyle = "#927024";
    sampleContext.fillRect(50, 900, 987, 650);
    sampleContext.fillStyle = "#e5cd96";
    sampleContext.fillRect(150, 925, 787, 75);
    sampleContext.fillRect(150, 1040, 787, 75);
    sampleContext.fillRect(150, 1155, 787, 75);
    sampleContext.fillRect(150, 1280, 787, 175);
    sampleContext.fillStyle =  "black";
    sampleContext.font = "40px Comic Sans MS";
    sampleContext.fillText("Card: " + shaqCardName, 175, 975); 
    sampleContext.fillText("Print: " + searchTerm, 175, 1090);
    sampleContext.fillText("Rarity: " + shaqCardEffect, 175, 1205);
    sampleContext.fillText("\"" + imageQuote + "\"", 175, 1350);
    
    sampleContext.drawImage(sampleBorder, 0, 0, sampleCanvas.width, sampleCanvas.height);
  
    const sampleAttachment = new AttachmentBuilder(await sampleCanvas.encode("png"), {name: "background.png"});
    await message.channel.send({files: [sampleAttachment]});
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
      cContext.drawImage(cImage, 50, 40, 987, 860);
      cContext.fillStyle = "rgba(139, 69, 19, 0.65)";
      cContext.fillRect(50, 40, 987, 860);
    break;
    default: 
      cContext.drawImage(cImage,50, 40, 987, 860);
  }
} 

