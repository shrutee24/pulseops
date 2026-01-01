const express = require("express");
const healthRoutes = require("./routes/health.routes");
const jobRoute = require("./routes/job.routes");
require("./utils/graceful-shutdown");

const app = express();

//Middleware
app.use(express.json());

// Routes
app.use("/api/v1/", healthRoutes);
app.use("/api/v1/jobs", jobRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Route not found"
  });
});

module.exports = app;
