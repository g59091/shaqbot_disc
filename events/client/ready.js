const memberCounter = require("../../counters/membercounter.js");
const hurricane = require("../reminders/hurricane.js");
const micreminder = require("../reminders/micreminder.js");
const welcome = require("../reminders/welcome.js");

module.exports = (client) => {
  console.log("ShaqBot up & running!!");
  memberCounter(client);
  micreminder(client);
  hurricane(client);
  welcome(client);
}