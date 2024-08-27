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
    // find info on openai's api for chatgpt
    // ping api using user prompt
    // get api result and return it to discord user
    var quesStr = "Who won the most amount of NBA championships in the last 10 years?"
    const gptClient = new OpenAI({ apiKey: open_token });
    const gptChat = await gptClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {"role": "system", "content": "You are a friendly assistant somewhat based on a American basketball player."},
        {"role": "assistant", "content": "Please keep the response less than or equal to 200 characters and/or tokens."},
        {"role": "user", "content": quesStr}
      ]
    });
    console.log(gptChat.choices[0].message.content);
  }
};