const { exec } = require("child_process");
const allJobs = require("../jobs");

// Run a safe job
const executeJob = (jobName) => {
  return new Promise((resolve, reject) => {
    const command = allJobs[jobName];

    if (!command) return reject(new Error("Invalid or unsafe job"));

    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(new Error(stderr));
      resolve(stdout.trim());
    });
  });
};

// Export job names for listing
const getAvailableJobs = () => Object.keys(allJobs);

module.exports = { executeJob, getAvailableJobs };
