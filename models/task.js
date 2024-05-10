const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    task_title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10003,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
