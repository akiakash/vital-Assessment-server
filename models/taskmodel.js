const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  complete: {
    type: Boolean,
    default: false, // Set the default value to false
  },
});

module.exports = mongoose.model("Task", taskSchema);
