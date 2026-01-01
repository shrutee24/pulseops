require("dotenv").config();

const app = require("./app");
const { PORT } = require("./config");
const { connectDatabase } = require("./config/database");
const startSchedulers = require("./cron/scheduler");

const startServer = async () => {
  try {
    // 1. Connect DB first
    await connectDatabase();

    // 2. Start cron/schedulers
    await startSchedulers();

    // 3. Start HTTP server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
