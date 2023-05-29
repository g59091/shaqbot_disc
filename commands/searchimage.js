var Scraper = require("images-scraper");

const google = new Scraper({
  puppeteer: {
    headless: true
  }
}
);

module.exports = {
  name: "searchimage",
  descripiton: "this sends an image to the discord channel",
  async execute(message, args, client){
    const image_query = args.join(" ");
    if (!image_query) return message.channel.send("Please enter an image name YB");

    const image_results = await google.scrape(image_query, 1);
    if (image_results.hasOwnProperty("0") && image_results[0].hasOwnProperty("url"))
      message.channel.send(image_results[0]["url"]);
    else
      message.channel.send("Error could not find image");
  }
}