const mongoose = require("mongoose");
const ScheduledJob = require("../models/scheduled-job.model");
const path = require("path"); 
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const seedJobs = async () => {
  try {
    // Clean old jobs
    await ScheduledJob.deleteMany();

    // Insert sample jobs
    await ScheduledJob.insertMany([
      {
        jobName: "Disk Health Check",
        command: "df -h",
        cronExpression: "*/5 * * * *",
        type: "system",
        isActive: true,
      },
      {
        jobName: "Memory Usage Check",
        command: "free -m",
        cronExpression: "*/10 * * * *",
        type: "system",
        isActive: true,
      },
    ]);

    console.log("✅ Sample jobs seeded successfully");
  } catch (error) {
    console.error("❌ Seeding failed", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

// Connect to MongoDB and run seeder
mongoose
  .connect(process.env.MONGO_URI)
  .then(seedJobs)
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  });

