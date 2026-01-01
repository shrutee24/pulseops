const { exec } = require("child_process");
const JobLog = require("../models/job-log.model");

const DEFAULT_TIMEOUT = 10000; // 10 seconds

const runJob = async (
  job,
  {
    triggerType = "system",
    executionType = "cli",
    timeout = DEFAULT_TIMEOUT
  } = {}
) => {
  const startTime = new Date();

  if (!job?.command) {
    await JobLog.create({
      jobName: job?.jobName || "unknown",
      command: "N/A",
      triggerType,
      executionType,
      status: "failed",
      error: "Command is undefined",
      startTime,
      endTime: new Date()
    });
    throw new Error("Command is undefined");
  }

  return new Promise((resolve, reject) => {
    const child = exec(job.command, { timeout }, async (error, stdout, stderr) => {
      const endTime = new Date();

      if (error) {
        const isTimeout = error.killed || error.signal === "SIGTERM";

        await JobLog.create({
          jobName: job.jobName,
          command: job.command,
          triggerType,
          executionType,
          status: "failed",
          output: stdout,
          error: isTimeout ? "Job timed out" : error.message,
          startTime,
          endTime
        });

        return reject(error);
      }

      await JobLog.create({
        jobName: job.jobName,
        command: job.command,
        triggerType,
        executionType,
        status: "success",
        output: stdout,
        startTime,
        endTime
      });

      resolve(stdout);
    });
  });
};

module.exports = runJob;
