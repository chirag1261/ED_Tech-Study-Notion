const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { signUp, login, sendOTP, changePassword, logout } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/sendotp", sendOTP);
router.put('/changepassword', auth, changePassword);
router.get("/logout", auth, logout);

//Reset Password
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

router.get("/authenticated", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Token is authenticated"
    })
})

module.exports = router;