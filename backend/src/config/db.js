import mongoose from "mongoose";
import env from "./env.js";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    logger.info("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    logger.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }

  // Mongoose logs
  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.info("MongoDB reconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose error:", err);
  });
};

export default connectDB;
