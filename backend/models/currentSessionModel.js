const mongoose = require("mongoose");

const currentSessionSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CurrentSession", currentSessionSchema);
