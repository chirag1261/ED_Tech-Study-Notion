//resetpasswordtoken, restpassword
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async(req, res) => {
    try {
        //get email
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Email is not registered",
            });
        }

        const token = crypto.randomBytes(20).toString('hex');

        //update user by adding token and expiration
        const updatedDetails = await User.findOneAndUpdate({email: email}, {
            token: token,
            resetPasswordExpires: Date.now() + 5*60*1000,  //5 min
        }, {new: true});

        const url = `https://study-notion-frontend-beta.vercel.app/update-password/${token}`;

        await mailSender("", email, "Password Reset Link", `Password Reset Link: ${url} \n Please note that, this link is valid upto 5 mins.`);

        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check email and reset password",
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending mail for reset password",
        });
    }
}

exports.resetPassword = async(req, res) => {
    try {
        const {password, confirmPassword, token} = req.body;
        if(password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password not matching",
            });
        }

        const userDetails = await User.findOne({token: token});
        if(!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: "Token is expired",
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({token: token}, {
            password: hashedPass,
        }, {new: true});

        return res.status(200).json({
            success: true,
            message: "Password reset Successsfully",
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reseting password",
        });
    }
}