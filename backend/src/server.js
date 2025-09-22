import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";
import env from "./config/env.js";

const PORT = env.port;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
