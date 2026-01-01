const express = require("express");
const router = express.Router();
const { runJob, listJobs } = require("../controllers/job.controller");

// GET /api/v1/jobs - list available jobs
router.get("/", listJobs);

// POST /api/v1/jobs/run - execute a job
router.post("/run", runJob);

module.exports = router;
