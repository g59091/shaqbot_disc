const mongoose = require("mongoose");
// todo: add picture functionality
const shaqSchema = new mongoose.Schema({
    userName: {type: String, require: true, unique: true},
    userId: {type: String, require: true},
    sCoins: {type: Number, default: 25 },
    // bank: {type: Number},
    sCards: [String],
    sCardIds: [String],
    // sCards: [{String, String}]
});

module.exports = mongoose.model("ShaqCollection", shaqSchema);
