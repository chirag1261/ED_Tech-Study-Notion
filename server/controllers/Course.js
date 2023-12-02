const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

exports.createCourse = async(req, res) => {
    try {
        //here category - id
        const { courseName, courseDescription, whatYouWillLearn, price, category, tags, status, instructions } = req.body;
        const thumbnail = req.files.thumbnail;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are neccessary",
            })
        }

        const catDetails = await Category.findById(category);
        if(!catDetails) {
            return res.status(404).json({
                success: false,
                message: "Categories Details not found",
            })
        }

        //upload image to cloudinary
        // console.log("Thumbnail", thumbnail);
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const thumbnailData = {
            url: thumbnailImage.secure_url,
            id: thumbnailImage.public_id,
        }
        
        if (!status || status === undefined) {
            status = "Draft"
        }

        //new course
        const newCourse = await Course.create({
            courseName, courseDescription, 
            instructor: req.user.id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tags: JSON.parse(tags),
            category: catDetails._id,
            thumbnail: thumbnailData,
			status: status,
			instructions: JSON.parse(instructions),
        })

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: req.user.id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new: true} 
        )

        //add new course to the category DB -> A single category can have multiple courses id
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            newCourse,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message
        })
    }
}

exports.editCourse = async(req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body;         //It does not include thumbnail

        let courseDetails = await Course.findById(courseId);

        if(!courseDetails) {
            return res.status(401).json({
                success: false,
                message: "Course Details not found",
            })
        }

        for(const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tags" || key === "instructions") {
                    courseDetails[key] = JSON.parse(updates[key])
                }
                else {
                    courseDetails[key] = updates[key]
                }
            }
        }

        const thumbnail = req?.files?.thumbnail;
        if(thumbnail) {
            if(courseDetails.thumbnail.id) {
                await cloudinary.uploader.destroy(courseDetails.thumbnail.id, {resource_type: "image"});
                
                //upload image to cloudinary
                const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

                const thumbnailData = {
                    url: thumbnailImage.secure_url,
                    id: thumbnailImage.public_id,
                }

                courseDetails.thumbnail = thumbnailData;
            }
        }

        await courseDetails.save();

        courseDetails = await Course.findById(courseId)
        .populate("category")
        .populate({
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            courseDetails,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message
        })
    }
}

exports.getAllCourses = async(req, res) => {
    try {
        const allCourses = await Course.find(
            { status: "Published" }, 
            {
                courseName: true, price: true, thumbnail: true, instructor: true,
                ratingAndReviews: true, studentEnrolled: true
            }
        ).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            data: allCourses,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get All courses",
            error: error.message
        })
    }
}

exports.getCourseDetails = async(req, res) => {
    try {
        const {courseId} =  req.body;
        const courseDetails = await Course.findById(courseId)
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        })
        .exec();

        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `No such course exists with ${courseId}`,
            })
        }

        return res.status(200).json({
            success: true,
            courseDetails
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get course details",
            error: error.message
        })
    }
}

exports.getInstructorCourses = async(req, res) => {
    try {
        const allCourses = await Course.find({instructor: req.user.id}).sort({ createdAt: -1 })
        .populate("category")
        .populate({
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        })
        .exec();
        
        if(!allCourses) {
            return res.status(400).json({
                success: false,
                message: "No Courses Found"
            })
        }

        return res.status(200).json({
            success: true,
            allCourses,
        }) 
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get All courses",
            error: error.message
        })
    }
}

exports.getFullCourseDetails = async(req, res) => {
    try {
        const {courseId} =  req.body;
        const courseDetails = await Course.findById(courseId)
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        })
        .exec();

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: req.user.id,
        });

        // console.log("Course Progress Count : ", courseProgressCount);

        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `No such course exists with ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((section) => {
            section.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? 
                    courseProgressCount?.completedVideos : [],
            }
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get course details",
            error: error.message
        })
    }
}

exports.deleteCourse = async(req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({ message: "Course not found "})
        }

        //Unenroll students from course
        const studentEnrolled = course.studentEnrolled;
        for(const studentId of studentEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        //Delete sections and subsections
        const courseSections = course.courseContent;
        for(const sectionId of courseSections) {
            const section = await Section.findById(sectionId);
            if(section) {
                const subsection = section.subSection;
                for(const subSectionId of subsection) {
                    const subSection = await SubSection.findById(subSectionId);

                    //Delete video from cloudinary
                    if(subSection.video.id) {
                        await cloudinary.uploader.destroy(subSection.video.id, {resource_type: "video"});
                    }
                    
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }

            //Delete the section
            await Section.findByIdAndDelete(sectionId);
        }

        // Delete Course from instructor
        await User.findByIdAndUpdate(course.instructor, {
            $pull: {courses: courseId},
        })

        //Delete thumbnail from cloudinary
        if(course.thumbnail.id) {
            await cloudinary.uploader.destroy(course.thumbnail.id, {resource_type: "image"});
        }

        //Delete the course
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Cannot delete the course"
        })
    }
}


