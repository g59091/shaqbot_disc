const memberCounter = require("../../counters/membercounter.js");
const micreminder = require("../../counters/micreminder.js");

module.exports = (client) => {
  console.log("ShaqBot up & running!!");
  memberCounter(client);
  micreminder(client);
}