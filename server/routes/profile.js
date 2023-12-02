const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middlewares/auth");
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard } = require("../controllers/Profile");

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

//Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);


module.exports = router;