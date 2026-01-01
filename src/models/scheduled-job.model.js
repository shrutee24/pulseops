const mongoose = require("mongoose");

const scheduledJobSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true
    },
    command: { type: String, required: true },   
    cronExpression: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    lastRunAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ScheduledJob", scheduledJobSchema);
