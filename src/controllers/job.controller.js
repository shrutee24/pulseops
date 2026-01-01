const jobService = require("../services/job.service");

// Execute a job
const runJob = async (req, res) => {
  try {
    const { jobName } = req.body;

    const output = await jobService.executeJob(jobName);

    res.status(200).json({
      status: "success",
      jobName,
      output
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

// List all available jobs
const listJobs = (req, res) => {
  const jobs = jobService.getAvailableJobs();
  res.status(200).json({
    status: "success",
    jobs
  });
};

module.exports = { runJob, listJobs };
