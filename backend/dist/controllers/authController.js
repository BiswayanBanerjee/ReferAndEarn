"use strict";
// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { mysqlPool } from "../config/dbMySQL";
// import { generateOTP } from "../utils/otpGenerator";
// import { sendEmail } from "../utils/emailHelper";
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
exports.verifySignupOTP = exports.resetPassword = exports.verifyOTP = exports.sendOTP = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbMySQL_1 = require("../config/dbMySQL");
const otpGenerator_1 = require("../utils/otpGenerator");
const emailHelper_1 = require("../utils/emailHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const signup = async (req: Request, res: Response) => {
//   const { email, password, name, date_of_birth } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = generateOTP();
//     await mysqlPool.query(
//       "INSERT INTO unverified_users (email, password, name, date_of_birth, otp) VALUES (?, ?, ?, ?, ?)",
//       [email, hashedPassword, name, date_of_birth, otp]
//     );
//     await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);
//     res.status(201).json({ message: "OTP sent to email. Please verify to complete signup." });
//   } catch (error) {
//     res.status(500).json({ message: "Error signing up", error });
//   }
// };
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, date_of_birth } = req.body;
    try {
        // Check if the email already exists in the users table
        const [registeredUser] = yield dbMySQL_1.mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (registeredUser.length > 0) {
            res.status(400).json({ message: "Email already registered. Please log in." });
            return;
        }
        // Check if the email already exists in the unverified_users table
        const [existingUser] = yield dbMySQL_1.mysqlPool.query("SELECT * FROM unverified_users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            // Generate a new OTP
            const otp = (0, otpGenerator_1.generateOTP)();
            // Update the existing record with the new OTP
            yield dbMySQL_1.mysqlPool.query("UPDATE unverified_users SET otp = ?, otp_created_at = NOW() WHERE email = ?", [otp, email]);
            // Resend the OTP email
            yield (0, emailHelper_1.sendEmail)(email, "Your OTP Code", `Your OTP code is ${otp}`);
            res.status(200).json({ message: "OTP resent to email. Please verify to complete signup." });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const otp = (0, otpGenerator_1.generateOTP)();
        yield dbMySQL_1.mysqlPool.query("INSERT INTO unverified_users (email, password, name, date_of_birth, otp) VALUES (?, ?, ?, ?, ?)", [email, hashedPassword, name, date_of_birth, otp]);
        yield (0, emailHelper_1.sendEmail)(email, "Your OTP Code", `Your OTP code is ${otp}`);
        res.status(201).json({ message: "OTP sent to email. Please verify to complete signup." });
    }
    catch (error) {
        res.status(500).json({ message: "Error signing up", error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const [rows] = yield dbMySQL_1.mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const user = rows[0];
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});
exports.login = login;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const otp = (0, otpGenerator_1.generateOTP)();
        yield dbMySQL_1.mysqlPool.query("INSERT INTO otps (email, otp) VALUES (?, ?)", [email, otp]);
        yield (0, emailHelper_1.sendEmail)(email, "Your OTP Code", `Your OTP is ${otp}`);
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error sending OTP", error });
    }
});
exports.sendOTP = sendOTP;
// export const verifyOTP = async (req: Request, res: Response) => {
//   const { email, otp } = req.body;
//   try {
//     const [rows]: any = await mysqlPool.query(
//       "SELECT * FROM otps WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) <= 5",
//       [email, otp]
//     );
//     if (rows.length === 0) {
//       res.status(400).json({ message: "Invalid or expired OTP" });
//       return;
//     }
//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying OTP", error });
//   }
// };
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const [otpRows] = yield dbMySQL_1.mysqlPool.query("SELECT * FROM otps WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) <= 5", [email, otp]);
        if (otpRows.length === 0) {
            res.status(400).json({ message: "Invalid or expired OTP" });
            return;
        }
        const [userRows] = yield dbMySQL_1.mysqlPool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (userRows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const user = userRows[0];
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "OTP verified successfully", token });
    }
    catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error });
    }
});
exports.verifyOTP = verifyOTP;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, newPassword } = req.body;
    try {
        const [rows] = yield dbMySQL_1.mysqlPool.query("SELECT * FROM otps WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, createdAt, NOW()) <= 5", [email, otp]);
        if (rows.length === 0) {
            res.status(400).json({ message: "Invalid or expired OTP" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield dbMySQL_1.mysqlPool.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error resetting password", error });
    }
});
exports.resetPassword = resetPassword;
// export const verifySignupOTP = async (req: Request, res: Response) => {
//   const { email, otp } = req.body;
//   try {
//     const [rows]: any = await mysqlPool.query("SELECT * FROM unverified_users WHERE email = ? AND otp = ?", [email, otp]);
//     if (rows.length === 0) {
//       res.status(400).json({ message: "Invalid or expired OTP" });
//       return;
//     }
//     const user = rows[0];
//     await mysqlPool.query(
//       "INSERT INTO users (email, password, name, date_of_birth) VALUES (?, ?, ?, ?)",
//       [user.email, user.password, user.name, user.date_of_birth]
//     );
//     await mysqlPool.query("DELETE FROM unverified_users WHERE email = ?", [email]);
//     res.status(200).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying OTP", error });
//   }
// };
const verifySignupOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const [rows] = yield dbMySQL_1.mysqlPool.query("SELECT * FROM unverified_users WHERE email = ? AND otp = ? AND TIMESTAMPDIFF(MINUTE, otp_created_at, NOW()) <= 5", [email, otp]);
        if (rows.length === 0) {
            res.status(400).json({ message: "Invalid or expired OTP" });
            return;
        }
        const user = rows[0];
        yield dbMySQL_1.mysqlPool.query("INSERT INTO users (email, password, name, date_of_birth) VALUES (?, ?, ?, ?)", [user.email, user.password, user.name, user.date_of_birth]);
        yield dbMySQL_1.mysqlPool.query("DELETE FROM unverified_users WHERE email = ?", [email]);
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });
        res.status(200).json({ message: "OTP verified successfully and user registered", token });
    }
    catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error });
    }
});
exports.verifySignupOTP = verifySignupOTP;
