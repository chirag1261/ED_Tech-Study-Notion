const express = require("express")
const router = express.Router();

//Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

//Course controller
const { createCourse, getAllCourses, getCourseDetails, getInstructorCourses, deleteCourse, getFullCourseDetails, editCourse } = require("../controllers/Course");

//Section Controller
const { createSection, updateSection, deleteSection } = require("../controllers/Section");

//SubSection controller
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSection");

//Category controller
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");

//Rating controller
const { createRating, getAverageRating, getAllRatingReview } = require("../controllers/RatingAndReview");

//Course Progess Controller
const { updateCourseProgress } = require("../controllers/CourseProgress");


/* ********************************************************************************************************
/                                      Course routes
 *********************************************************************************************************/

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails);  
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

//Section
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

//SubSection
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);


router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


/* ********************************************************************************************************
/                                      Category routes (Only by Admin)
 *********************************************************************************************************/
router.post("/createCategory", auth, isAdmin, createCategory)


/* ********************************************************************************************************
/                                      Rating and Review
 *********************************************************************************************************/
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingReview);

/* ********************************************************************************************************
/                                      Course Progress
 *********************************************************************************************************/
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;