"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import { connectMongoDB } from "./config/dbMongo";
// import { mysqlPool } from "./config/dbMySQL";
// import authRoutes from "./routes/authRoutes";
// import noteRoutes from "./routes/noteRoutes";
// import { createTables } from "./config/createTables";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/notes", noteRoutes);
// (async () => {
//   try {
//     await connectMongoDB();
//     await mysqlPool.getConnection(); // Test MySQL connection
//     console.log("Connected to MySQL");
//     await createTables();
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   } catch (error) {
//     console.error("Error starting the server:", error);
//   }
// })();
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbMongo_1 = require("./config/dbMongo");
const dbMySQL_1 = require("./config/dbMySQL");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const user_1 = require("./models/user");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Allow requests from your frontend
const allowedOrigins = ["http://localhost:3000", "https://your-frontend.netlify.app"];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true, // Allow cookies if needed
}));
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/notes", noteRoutes_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbMongo_1.connectMongoDB)();
        yield dbMySQL_1.mysqlPool.getConnection(); // Test MySQL connection
        console.log("Connected to MySQL");
        yield (0, user_1.createUserTable)(); // Ensure the users table is created/updated
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (error) {
        console.error("Error starting the server:", error);
    }
}))();
