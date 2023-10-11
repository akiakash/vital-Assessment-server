const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Default to false (task is not completed)
  },
});

module.exports = mongoose.model("todo", PostSchema);
