import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';


export const registerUser = asyncHandler(async(req , res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {name , username , email , password } = req.body;

  //Check if user already exists
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  //create new user
  const user = await User.create({name , username , email , password});
  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
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
      name: user.name,
      username: user.username,
      email: user.email,
      token : generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});