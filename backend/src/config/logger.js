import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Common log format
const fileLogFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

// Pretty console format
const consoleLogFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, stack }) =>
    stack
      ? `${timestamp} [${level}]: ${message}\n${stack}`
      : `${timestamp} [${level}]: ${message}`,
  ),
);

// Daily rotating file transport
const dailyRotateTransport = (filenamePrefix, level) =>
  new DailyRotateFile({
    dirname: path.join(logDir, level),
    filename: `${filenamePrefix}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level,
    format: fileLogFormat,
  });

const logger = winston.createLogger({
  level: "info",
  transports: [
    dailyRotateTransport("error", "error"),
    dailyRotateTransport("warn", "warn"),
    dailyRotateTransport("combined", "info"),
    new winston.transports.Console({
      format: consoleLogFormat,
    }),
  ],
  exitOnError: false,
});

export default logger;
