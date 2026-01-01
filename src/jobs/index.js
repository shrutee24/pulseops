//Handles all auotmation tasks
const systemJobs = require("./systemJobs");
const customJobs = require("./customJobs");

// Merge all job types
const allJobs = { ...systemJobs, ...customJobs };

module.exports = allJobs;
