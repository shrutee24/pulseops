const mongoose = require("mongoose");
const ScheduledJob = require("../models/scheduled-job.model");
const runJob = require("../cron/job-runner");
require("dotenv").config({ path: "../.env" });

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const job = await ScheduledJob.findOne({ isActive: true });
    if (!job) throw new Error("No active job found");

    console.log(`▶ Manually running job: ${job.jobName}`);

    await runJob(job, {
      triggerType: "manual",
      executionType: "cli"
    });

    console.log("✅ Manual job executed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Manual job failed:", err.message);
    process.exit(1);
  }
})();
