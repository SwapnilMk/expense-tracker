import express from "express";
import cors from "cors";
import morgan from "morgan";
import { corsOptions } from "./config/cors.js";
import routes from "./routes/index.js";
import logger from "./config/logger.js";

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// API routes
app.use("/api/v1", routes);

// route handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

export default app;
