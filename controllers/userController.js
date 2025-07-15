import userSchema from "../models/userModel.js";
import { validationResult } from "express-validator";
import generateToken from "../helper/generateToken.js";
import { hashPassword, passwordCompare } from "../helper/hashPassword.js";

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const { firstName, lastName, email, userName, password } = req.body;
        
        // Find existing username
        const findUserNameInDb = await userSchema.findOne({ userName });
        if (findUserNameInDb) {
            return res.status(400).json({
                message: "Username already in use"
            })
        };

        // Find existing email
        const findEmailInDb = await userSchema.findOne({ email });
        if (findEmailInDb) {
            return res.status(400).json({
                message: "Email already in use"
            })
        };

        // Hash Password
        const hashedPassword = await hashPassword(password)

        // Create new user
        const createNewUser = new userSchema({
            firstName, 
            lastName, 
            email,
            userName,
            password: hashedPassword,
        });
        await createNewUser.save();
        
        res.status(201).json({
            message: "User created successfully",
            createNewUser,
        });
    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
}

export const loginUser = async (req, res) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    };

    try {
        const { userName, password } = req.body;

        const findUserByUserName = await userSchema.findOne({ userName });
        if (!findUserByUserName) {
            return res.status(400).json({
                message : "Invalid Credentials",
            })
        };

        const isMatch = await passwordCompare(password, findUserByUserName.password);
        if (!isMatch) {
            return res.status(400).json({
                message : "Incorrect Password",
            })
        };

        if (findUserByUserName && isMatch) {
            const token = generateToken(findUserByUserName._id);

            // ✅ Send token in HTTP-Only Cookie
            res.cookie("jwt", token, {
                httpOnly: true, // Prevents JavaScript access (XSS protection)
                secure: process.env.NODE_ENV === "production", // Use HTTPS in production
                sameSite: "strict", // Prevent CSRF attacks
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            res.status(200).json({
                message: "Login Successful",
                user : findUserByUserName,
                token
            })

            // res.redirect(`
            //     /profile.html
            // `);
                
            // ?id=${findUserByUserName._id}
        }

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getallUsers = async (req, res) => {
    try {
        const allUsers = await userSchema.find().select("-password");
        res.status(200).json({
            message: "Users fetched successfully",
            data: allUsers,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}