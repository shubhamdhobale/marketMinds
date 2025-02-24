import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // Exclude password field
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});