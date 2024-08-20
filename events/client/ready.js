import memberCounter from "../../counters/membercounter.js";
import hurricane from "../reminders/_wip_hurricane.js";
import micreminder from "../reminders/micreminder.js";
import welcome from "../reminders/welcome.js";

export default (client) => {
  console.log("ShaqBot up & running!!");
  memberCounter(client);
  micreminder(client);
  // hurricane(client);
  welcome(client);
};