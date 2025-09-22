import express from "express";
import cors from "cors";
import morgan from "morgan";
import { corsOptions } from "./config/cors.js";
import Routes from "./routes/index.js";

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()), }, }));

// API routes
app.use("/api/v1", Routes);

export default app;
