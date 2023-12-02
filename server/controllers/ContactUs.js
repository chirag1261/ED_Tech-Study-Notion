const { contactUsEmail } = require("../mail/templates/contactFormRes");
const { contactUsEmailOwner } = require("../mail/templates/contactUsOwnerTemplater");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

exports.countactUs = async(req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, countrycode, message} = req.body;

        if(!firstName || !lastName || !email || !phoneNo || !countrycode || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!", 
            })
        }

        const properMessage = `From ${firstName + " " + lastName} \n Email - ${email} \n Phone Number: ${countrycode + " " + phoneNo} \n\n ${message}`;

        // Send Message to the owner of the StudyNotion
        mailSender(email, process.env.MAIL_USER, "StudyNotion - Contact Us", contactUsEmailOwner(email, firstName, lastName, message, phoneNo, countrycode));

        // Send Message to the sender
        mailSender('', email, "StudyNotion - Thanks for Contacting Us!", contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode));

        return res.status(200).json({
            success: true,
            message: "Mail sent Successfully"
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Cannot send message at this time, plaese try again later",
            error: error.message
        })
    }
}