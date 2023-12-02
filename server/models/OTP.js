const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
});

//Send OTP to email
async function sendVerficationEmail(email, otp) {
    try {
        const mailResponse = await mailSender("", email, "Verification Email from StudyNotion", emailTemplate(otp));
        // console.log("Email Sent Successfully", mailResponse.response);
    }
    catch(e) {
        console.log("Error while sending mail", e);
        throw e;
    }
}

//pre middleware
OTPSchema.pre("save", async function(next) {
    if(this.isNew){
        await sendVerficationEmail(this.email, this.otp);
    }
    next();  //go the the next middleware
}) 

module.exports = mongoose.model("OTP", OTPSchema);