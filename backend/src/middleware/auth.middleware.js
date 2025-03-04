import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    console.log("Authorization Header:", req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log("Extracted Token:", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                console.error("User not found for token:", decoded);
                return res.status(401).json({ message: "Not Authorized, user not found" });
              }
              
            next();
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            res.status(401).json({ message: "Not Authorised, token failed" });
            return;
        }
    } else {
        res.status(401).json({ message: "Not Authorised, no token" });
        return;
    }
});
