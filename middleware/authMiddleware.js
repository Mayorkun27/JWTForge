import jwt from "jsonwebtoken";
import userSchema from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    
    // Read token from cookie
    let token = req.cookies.jwt;
    
    // Getting token from authorization header
    // let token;
    // Check if the request has an Authorization header with a Bearer token
    // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // token = req.headers.authorization.split(" ")[1];
        
    // }
    // Getting from cookie
    if (token) {
        // console.log("this is seen token", token)
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from the token and attach to request (excluding password)
            req.user = await userSchema.findById(decoded.userId).select("-password");
            // console.log(req.user)
            next();
        } catch (error) {
            console.error(error)
            res.status(401).json({ 
                message: "Not authorized, invalid token"
            });
        }
    } else {
        res.status(401).json({ 
            message: "Not authorized, no token provided"
        });
    }
};