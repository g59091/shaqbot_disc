import { ChatGPTAPI } from 'chatgpt';
import { request } from 'undici';
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
    const api = new ChatGPTAPI({
      apiKey: open_token
    });

    const res = await api.sendMessage('hello there');
    console.log(res.text);
  }
};
//