const nodemailder = require("nodemailer");
require("dotenv").config();

const mailSender = async(fromEmail, email, title, body) => {
    try {
        let transporter = nodemailder.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info;
        if(fromEmail !== '') {
            info = await transporter.sendMail({
                from: `${fromEmail}`,
                to: `${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
        }
        else {
            info = await transporter.sendMail({
                from: "StudyNotion by Chirag Kumar",
                to: `${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
        }

        // console.log("Info -> ", info);
        return info;
    }
    catch(error) {
        console.log(error.message);
    }
}

module.exports = mailSender;
