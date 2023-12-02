const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const cloudinary = require("cloudinary").v2;
const {convertSecondsToDuration} = require("../utils/secToDuration");

exports.updateProfile = async(req, res) => {
    try {
        const {firstName, lastName, gender, dateOfBirth, about, contactNumber} = req.body;
        const id = req.user.id;

        if(!firstName || !lastName || !gender || !dateOfBirth || !about || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All field req.",
            })
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        //update
        const profileDetails = await Profile.findById(profileId);

        userDetails.firstName = firstName;
        userDetails.lastName = lastName

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated Successfully",
            userDetails,
            profileDetails,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update profile",
            error: error.message,
        })
    }
}

exports.deleteAccount = async(req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Given user id does not exists",
            })
        }

        //If user enrolled in a course?
        if(userDetails.courses.length !== 0) {

            if(req.user.accountType === "Instructor") {
                // INSTRUCTOR CASE
                return res.status(403).json({
                    success: false,
                    message: "Cannot delete Instructor Account"
                })
            }
            else {
                //STUDENT CASE

                //Delete user from a particular course
                for (const course of userDetails.courses) {
                    const courseDetails = await Course.findById(course);

                    //Filter the other students who are enrolled
                    const studentEnrolled = courseDetails.studentEnrolled.filter(
                        (student) => student.toString() !== id
                    );
                    
                    courseDetails.studentEnrolled = studentEnrolled;
                    await courseDetails.save();
                }
            }
        }

        if(userDetails.image.image_id) { //if exists
            //delete from cloudinary
            await cloudinary.uploader.destroy(userDetails.image.image_id);
        }
        
        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully",
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete account",
            error: error.message,
        })
    }
}

exports.getAllUserDetails = async(req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        
        return res.status(200).json({
            success: true,
            message: "User data fetched Successfully",
            userDetails
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to get user details",
            error: error.message,
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        if(!displayPicture) {
            res.status(400).json({
                success: false,
                message: 'Cannot upload Image',
            })
        }

        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        if(userDetails.image.image_id) { //if exists
            //delete from cloudinary
            // console.log(userDetails.image.image_id);
            await cloudinary.uploader.destroy(userDetails.image.image_id);
        }

        const uploadImage = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const imageDetails = {
            image_url: uploadImage.secure_url,
            image_id: uploadImage.public_id
        }

        await User.findByIdAndUpdate(
            userId,
            { image: imageDetails },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
        })
    }
     catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({         //let is used bcz we are use using progressPercentage
            _id: userId,
        })
        .populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            }
        }).exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }

        userDetails = userDetails.toObject();
        var subSectionLength = 0;
        for(let i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            subSectionLength = 0;

            for(let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length
            }
            
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            })

            courseProgressCount = courseProgressCount?.completedVideos.length;

            if(subSectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            }
            else {
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / subSectionLength) * 100 * multiplier) / multiplier;

            }
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({instructor: req.user.id});
        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            //create new object with additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats;
        })

        res.status(200).json({
            courses: courseData
        })
    }
    catch(error) {
        console.log(error);
        res.status.json({error: error.message, message: "Something went wrong"})
    }
}