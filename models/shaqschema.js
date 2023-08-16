const mongoose = require("mongoose");

const shaqSchema = new mongoose.Schema({
    userId: {type: String, require: true, unique: true},
    serverId: {type: String, require: true},
    sCoins: {type: Number, default: 25 },
    bank: {type: Number}
});

module.exports = mongoose.model("ShaqCollection", shaqSchema);
