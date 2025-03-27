import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from "crypto"; 
import sendEmail from "../utils/sendEmail.js"; 

export const registerUser = asyncHandler(async(req , res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username , email , password } = req.body;

  //Check if user already exists
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  //create new user
  const user = await User.create({ username , email , password});
  if(user){
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token : generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User data');
  }
});

export const authUser = asyncHandler(async(req , res) => {
  console.log("I am  here in Login route")
  const {email , password} = req.body;
  const user = await User.findOne({ email });

  if(user && (await user.matchPassword(password))){
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token : generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

export const googleSignIn = asyncHandler(async (req, res) => {
  try {
    console.log("Google Auth Request Body:", req.body);

    const { username, email, uid, photoURL } = req.body;  // Include photoURL

    if (!email || !uid) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        googleId: uid,  // ✅ Save Google UID
        photoURL,       // ✅ Save profile picture
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ user, token });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Server error during Google authentication" });
  }
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
      return res.status(404).json({ message: "User not found" });
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  console.log("Generated Reset Token:", resetToken);
  console.log("Hashed Reset Token:", hashedToken);

  // Save token in DB
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  console.log("Before Saving:", user);

  await user.save({ validateBeforeSave: false });

  console.log("After Saving:", await User.findOne({ email }));

  // Send reset link
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>This link expires in 10 minutes.</p>
    `;

    try {
        await sendEmail(email, "Password Reset", message);
        return res.json({ message: "Password reset link sent!", resetUrl });
    } catch (error) {
        console.error("Email send error:", error);
        return next(new Error("Email could not be sent"));
    }
  // res.json({ message: "Password reset link sent!", resetUrl });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const resetToken = req.params.token;

  // Hash the received token
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  console.log("Received Reset Token:", resetToken);
  console.log("Hashed Token:", hashedToken);

  // Find user with matching hashed token
  const user = await User.findOne({ resetPasswordToken: hashedToken });

  console.log("User Found:", user); // Debug log

  if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Update user's password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful!" });
});

