// import { ChatGPTAPI } from 'chatgpt';
// import { request } from 'undici';
import OpenAI from 'openai';
import jdata from "../c.json" assert { type: "json" };
const { open_token } = jdata;

export default {
  name: 'question',
  aliases: ["ques"],
  permissions: [],
  cooldown: 10,
  description: 'ask questions via openai',
  async execute(message, args, client, profileInfo) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel");
    if (!args.length) return message.channel.send("Search phrase needed BND");
    var quesStr = args.join(' ');
    // var quesStr = "What's your favorite basketball team?";
    const gptClient = new OpenAI({ apiKey: open_token });
    const gptChat = await gptClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {"role": "system", "content": "You are loosely based on American basketball player called Shaq."},
        {"role": "assistant", "content": "Please keep the response less than or equal to 250 characters and/or tokens."},
        {"role": "user", "content": quesStr}
      ]
    });
    if (gptChat.choices[0])
      return message.channel.send(gptChat.choices[0].message.content);
  }
};