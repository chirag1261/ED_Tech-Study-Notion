const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const cloudinary = require("cloudinary").v2;

exports.createSection = async(req, res) => {
    try {
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing fields",
            })
        }

        const newSection = await Section.create({sectionName});

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id,
            }
        }, {new: true})
        .populate({ 
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create section",
            error: error.message,
        })
    }
}

exports.updateSection = async(req, res) => {
    try {
        const {sectionName, sectionId, courseId} = req.body;
        if(!sectionName) {
            return res.status(400).json({
                success: false,
                message: "Missing fields",
            })
        }

        await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});

        const updatedCourseDetails = await Course.findById(courseId).populate({ 
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedCourseDetails,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update section",
            error: error.message,
        })
    }
}

exports.deleteSection = async(req, res) => {
    try {
        const {courseId, sectionId} = req.body;

        if(!courseId || !sectionId) {
            return res.status(400).json({
                success: true,
                message: "Field required",
            })
        }

        const section = await Section.findById(sectionId);
        if(!section) {
            return res.status.json({
                success: false,
                message: "Section Not Found",
            })
        }

        //Deleting all subsections in section
        const subsection = section.subSection;
        for(const subSectionId of subsection) {
            const subSection = await SubSection.findById(subSectionId);

            //Delete video from cloudinary
            if(subSection.video.id) {
                await cloudinary.uploader.destroy(subSection.video.id, {resource_type: "video"});
            }
            
            await SubSection.findByIdAndDelete(subSectionId);
        }

        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        }, {new: true});

        await Section.findByIdAndDelete(sectionId);

        const data = await Course.findById(courseId).populate({ 
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted Successfully",
            data,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section",
            error: error.message,
        })
    }
}