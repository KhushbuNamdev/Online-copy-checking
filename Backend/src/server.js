import dns from 'node:dns/promises';
// Set DNS servers before any other imports or connection logic
dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userroute.js";
import { errorHandler } from "./Middleware/errorMiddleware.js";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "../src/Config/swegger.js";
import connectDB  from "../src/Config/db.js"

dotenv.config();

const app = express();
connectDB();
// Middleware to read JSON
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
console.log(swaggerSpec.paths);
  console.log(`📄 Swagger Docs: http://localhost:${PORT}/api-docs`);
app.use(errorHandler);

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});