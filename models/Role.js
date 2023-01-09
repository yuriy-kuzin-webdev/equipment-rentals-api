const mongoose = require("mongoose");

const Role = new mongoose.Schema({
  value: { type: String, unique: true, default: "CLIENT" },
});

module.exports = mongoose.model("Role", Role);
