const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async(req, res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try {
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({success: false, message: "No Course found"});
        }

        const subSection = await SubSection.findById(subSectionId);
        if(!subSection) {
            return res.status(404).json({success: false, message: "No Sub Section found"});
        }

        //Check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        if(!courseProgress) {
            return res.status(404).json({success: false, message: "Course Progress doess not exists"});
        }
        else {
            //Check for recompleting subsection
            if(courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({success: false, message: "Subsection already completed"});
            }
            else {
                courseProgress.completedVideos.push(subSectionId);
            }
        }

        await courseProgress.save();

        return res.status(200).json({
            success: true, 
            message: "Lecture Completed",
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false, 
            message: "Cannot update the course progess",
            error: error.message
        });
    }
}