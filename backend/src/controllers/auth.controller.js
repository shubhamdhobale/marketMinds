import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

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
