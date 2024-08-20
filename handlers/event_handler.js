// const fs = require("fs");
import fs from "fs";

export default async (client) => {
  const load_dir = async (dirs) => {
    const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith(".js"));

    for (const file of event_files) {
      const event = await import(`../events/${dirs}/${file}`);
      const eventdef = event.default;
      const event_name = file.split(".")[0];
      
      //console.log("eventName:",  event_name);
      // client.on(event_name, event.bind(null, client));
      client.on(event_name, eventdef.bind(null, client));
    }
  }

  ["client", "guild"].forEach(e => load_dir(e));
};