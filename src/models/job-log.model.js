const mongoose = require("mongoose");

const jobLogSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true,
      trim: true
    },

    command: {
      type: String,
      required: true
    },

    triggerType: {
      type: String,
      enum: ["manual", "scheduled", "system"],
      required: true
    },

    executionType: {
      type: String,
      enum: ["cron", "api", "cli"],
      required: true
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      required: true
    },

    output: String,
    error: String,

    startTime: {
      type: Date,
      required: true
    },

    endTime: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobLog", jobLogSchema);
