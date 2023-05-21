const memberCounter = require("../../counters/membercounter.js");

module.exports = (client) => {
    console.log("ShaqBot up & running!!");
    memberCounter(client);
}