import { Router } from "express";
import { sendOTP, loginWithOTP, refer, fetchReferrals,fetchPrograms, checkReferral, pingServer } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// Public Routes
router.post("/send-otp", sendOTP);
router.post("/login", loginWithOTP);
router.get("/ping", pingServer);

// Protected Routes (Require Token)
router.get("/programs", fetchPrograms);
router.post("/refer", authenticate, refer);
router.post("/referrals", authenticate, fetchReferrals);
router.post("/check-referral", authenticate, checkReferral);

export default router;

