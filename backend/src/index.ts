import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { prisma } from "./database/prismaClient"; // Import Prisma client

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:3000", "https://your-frontend.netlify.app"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server
const startServer = async () => {
  try {
    await prisma.$connect(); // Ensure Prisma can connect to the DB
    console.log("✅ Connected to MySQL via Prisma");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1); // Exit process on failure
  }
};

// Graceful shutdown (handle process termination)
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
