const mongoose = require("mongoose");

const shutdown = async (signal) => {
  console.log(`🛑 Received ${signal}. Shutting down gracefully...`);

  try {
    await mongoose.connection.close();
    console.log("🟢 MongoDB connection closed");
  } catch (err) {
    console.error("❌ Error during shutdown", err);
  } finally {
    process.exit(0);
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
