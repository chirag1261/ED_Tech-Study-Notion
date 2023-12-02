//middlewares -> auth, student, instructor
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//authentication
exports.auth = async(req, res, next) => {
    try {
        //extract
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        //verify
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("decode-> ", decode);
            req.user = decode;
        }
        catch(e) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }
        next();
    }
    catch(error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}

exports.isStudent = async(req, res, next) => {
    try {
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is the protected routes for students only",
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified",
        });
    }
}

exports.isInstructor = async(req, res, next) => {
    try {
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is the protected routes for instructor only",
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified",
        });
    }
}

exports.isAdmin = async(req, res, next) => {
    try {
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is the protected routes for admin only",
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "user role cannot be verified",
        });
    }
}