import Scraper from "images-scraper";

const google = new Scraper({
  puppeteer: {
    headless: true
  }
});

// https://www.npmjs.com/package/google-images
// consider converting to google-images library
// use google API to reach to get google images
// maybe puppeteer? https://github.com/pevers/images-scraper/issues/113
export default {
  name: "searchimage",
  descripiton: "this sends an image to the discord channel",
  async execute(message, args, client) {
    if (message.channel.name !== "🤖-commands") return message.channel.send("Please use this command in the 🤖-commands channel"); 
    const image_query = args.join(" ");
    console.log(image_query);
    if (!image_query) return message.channel.send("Please enter an image name YB");

    const image_results = await google.scrape(image_query, 1);
    console.log(image_results);
    if (image_results.hasOwnProperty("0") && image_results[0].hasOwnProperty("url"))
      message.channel.send(image_results[0]["url"]);
    else
      message.channel.send("Error could not find image");
  }
}