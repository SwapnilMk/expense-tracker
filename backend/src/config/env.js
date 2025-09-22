import "dotenv/config";

export default {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
  mongoUri: process.env.MONGO_URI,
};
