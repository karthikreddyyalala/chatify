import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import {ENV} from "../lib/env.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    generateToken(savedUser._id, res);

    res.status(201).json({
      _id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
      profilepic: savedUser.profilepic,
    });

    // send email AFTER response
    sendWelcomeEmail(
      savedUser.email,
      savedUser.fullname,
      ENV.CLIENT_URL
    ).catch(console.error);

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const login = async (req, res) => {
  res.send("Login endpoint");
};

export const logout = async (req, res) => {
  res.send("Logout endpoint");
};
