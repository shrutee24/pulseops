const cron = require("node-cron");
const ScheduledJob = require("../models/scheduled-job.model");
const runJob = require("./job-runner");

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

const startSchedulers = async () => {
  console.log("🔄 Loading scheduled jobs from database...");

  const jobs = await ScheduledJob.find({ isActive: true });

  jobs.forEach((job) => {
    cron.schedule(job.cronExpression, async () => {
      console.log(`▶ Running scheduled job: ${job.jobName}`);

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          await runJob(job, {
            triggerType: "scheduled",
            executionType: "cron"
          });

          console.log(`✅ Job ${job.jobName} completed`);
          break;

        } catch (err) {
          console.error(
            `⚠ Attempt ${attempt} failed for ${job.jobName}: ${err.message}`
          );

          if (attempt < MAX_RETRIES) {
            console.log(`⏳ Retrying in ${RETRY_DELAY / 1000}s...`);
            await new Promise((r) => setTimeout(r, RETRY_DELAY));
          }
        }
      }

      // update last run time (not job log)
      job.lastRunAt = new Date();
      await job.save();
    });

    console.log(`📌 Scheduled: ${job.jobName} (${job.cronExpression})`);
  });
};

module.exports = startSchedulers;
