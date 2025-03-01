import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prismaClient";
import { generateOTP } from "../utils/otpGenerator";
import { sendEmail } from "../utils/emailHelper";

/**
 * Sends an OTP to the user's email for authentication.
 */
export const sendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.body.email?.trim();

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const otp = generateOTP();
    await prisma.otp.create({ data: { email, otp } });
    await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Logs in the user using OTP authentication.
 */
export const loginWithOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.body.email?.trim();
    const otp = req.body.otp?.trim();

    if (!email || !otp) {
      res.status(400).json({ message: "Email and OTP are required" });
      return;
    }

    const otpRecord = await prisma.otp.findFirst({
      where: {
        email,
        otp,
        createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) }, // OTP valid for 5 minutes
      },
    });

    if (!otpRecord) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const defaultProgram = await prisma.program.findFirst();
      if (!defaultProgram) {
        res.status(400).json({ message: "No referral programs found" });
        return;
      }

      user = await prisma.user.create({
        data: {
          email,
          name: "Guest User",
          programId: defaultProgram.id,
          referee_email: ""
        },
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    await prisma.otp.deleteMany({ where: { email } });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches all available referral programs.
 */
export const fetchPrograms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const programs = await prisma.program.findMany();
    res.status(200).json({ programs });
  } catch (error) {
    next(error);
  }
};

export const refer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, referee_email, programId } = req.body;

    if (!email || !referee_email || !programId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const program = await prisma.program.findUnique({ where: { id: programId } });
    if (!program) {
      res.status(400).json({ message: "Program not found" });
      return;
    }

    // Check if the referee email already exists
    const existingReferee = await prisma.user.findUnique({ where: { email: referee_email } });
    if (existingReferee) {
      res.status(400).json({ message: "Duplicate referral is not possible. This email has already been referred." });
      return;
    }

    // Fetch referee bonus amount
    const refereeBonus = program.referee_bonus_amount || 0;

    const referee = await prisma.user.create({
      data: {
        email: referee_email,
        name: "Referee Name",
        programId,
        referee_email: email,
      },
    });

    // Prepare email content with program name & referee bonus amount
    const emailSubject = `You've Been Referred to ${program.name}!`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <img src="cid:referral-banner" style="width: 100%; max-width: 600px;" />
        <h2>${email} has referred you to join ${program.name}!</h2>
        <p>Join now and start earning rewards with our exclusive ${program.name} program.</p>
        <p><strong>You will receive a bonus of ₹${refereeBonus} upon enrolling!</strong></p>
        <a href="https://accredian.com/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Login Now</a>
      </div>
    `;

    // Send referral email
    await sendEmail(referee_email, emailSubject, emailHtml);

    res.status(201).json({ message: `Referral successful! ${referee_email} has been invited to ${program.name} with a ₹${refereeBonus} bonus.`, referee });
  } catch (error) {
    next(error);
  }
};

export const checkReferral = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { referee_email } = req.body;

    if (!referee_email) {
      res.status(400).json({ message: "Referee email is required." });
      return;
    }

    const existingReferee = await prisma.user.findUnique({ where: { email: referee_email } });

    res.status(200).json({ exists: !!existingReferee });
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};

/**
 * Fetches referrals made by a user.
 */
export const fetchReferrals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.body.email?.trim();

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const referrals = await prisma.user.findMany({ where: { referee_email: email } });
    res.status(200).json({ referrals });
  } catch (error) {
    next(error);
  }
};

export const pingServer = async (req: Request, res: Response) => {
  try {
    res.status(200).send("Server is awake!");
  } catch (error) {
    console.error("Error in ping route:", error);
    res.status(500).send("Something went wrong.");
  }
};
