const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();

exports.sendOTP = async(req, res) => {
    try {
        const { email } = req.body;

		// Check if user is already present
		const checkUserPresent = await User.findOne({ email });

		// If user found with provided email
		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });

		// console.log("Result is Generate OTP Func");
		// console.log("OTP", otp);
		// console.log("Result", result);

		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}

		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		// console.log("OTP Body", otpBody);

		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

exports.signUp = async(req, res) => {
    try {
        const {
            firstName, 
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not match",
            });
        }

        //check user exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        //find most recent otp
        const response = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        // console.log("Recent Otp BODY - > ", response[0]);
        // console.log("recent OTP -> ", response[0].otp);  
        // console.log("Body OTP ->", otp);

        if(response.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP Not found",
            });
        }
        else if (otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        }); 

        const image = {
            image_url: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPass,
            accountType,
            approved,
            additionalDetails: profileDetails._id,
            image,
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User can not registered, try again later",
            error: error.message
        });
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }
        
        //passwordmatch and generate JWT
        if(await bcrypt.compare(password, user.password)) {
            const payload = {email: user.email, id: user._id, accountType: user.accountType};
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            //generate cookie
            res.cookie("token", token, options).status(200).json({
                success: true,
                token, 
                user,
                message: "Logged in Successfully"
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is inncorrect",
            });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        });
    }
}

exports.changePassword = async(req, res) => {
    //get oldPass, new pass, confirm pass
    try {
		const userDetails = await User.findById(req.user.id);
        const {oldPassword, newPassword} = req.body;

        //validate
        if(!oldPassword || !newPassword ) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }
    
        if(newPassword === oldPassword) {
            return res.status(401).json({
                success: false,
                message: "New Password and Old password should be different",
            });
        }

        if(await bcrypt.compare(oldPassword, userDetails.password)) {
            //update pwd in DB
            const hashedPass = await bcrypt.hash(newPassword, 10);
            const updatedUserDetails = await User.findByIdAndUpdate(
                req.user.id,
                { password: hashedPass },
                { new: true }
            );

            // Send notification email
            try {
                const emailResponse = await mailSender("",
                    updatedUserDetails.email,
                    "StudyNotion - Password Changed",
                    passwordUpdated(
                        updatedUserDetails.email, `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                    )
                );
                // console.log("Email sent successfully:", emailResponse.response);
            } 
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                    error: error.message,
                });
            }

            return res.status(200).json({
                success: true,
                message: "Password Changed Succesfully",
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Incorrect old Password",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while changing password",
            error: error.message
        });
    }
}

exports.logout = async(req, res) => {
    try { 
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        res.status(200).json({
            success: true,
            message: "Logged Out Successfully",
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message: "Cannot logout",
            error: error.message,
        })
    }
}