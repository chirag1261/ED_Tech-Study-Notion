const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

exports.createSubSection = async(req, res) => {
    try {
        const {title, description, sectionId, courseId} = req.body;
        const video = req.files.video;

        if(!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are req.",
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const videoData = {
            url: uploadDetails.secure_url,
            id: uploadDetails.public_id,
        }

        const subSectionDetails = await SubSection.create({
            title: title, 
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            video: videoData
        });

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push : { 
                subSection: subSectionDetails._id,
            }
        }, {new: true}).populate("subSection")

        const courseDetails = await Course.findById(courseId).populate({ 
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({ 
            success: true,
            message: "SubSection created successfully",
            updatedSection,
            courseDetails
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Subsection",
            error: error.message,
        })
    }
}

exports.updateSubSection = async(req, res) => {
    try {
        const { subSectionId, title, description, courseId } = req.body;
        const video = req.files?.video;

        const subSection = await SubSection.findById(subSectionId);
    
        if (!subSectionId) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }
    
        if (title) {
            subSection.title = title;
        }
    
        if (description) {
            subSection.description = description;
        }

        if (video) {
            if(subSection.video.id) {
                await cloudinary.uploader.destroy(subSection.video.id, {resource_type: "video"});
            }
            
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            
            const videoData = {
                url: uploadDetails.secure_url,
                id: uploadDetails.public_id,
            }

            subSection.video = videoData;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }
    
        await subSection.save();

        const updatedCourseDetails = await Course.findById(courseId).populate({ 
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully with video!",
            updatedCourseDetails
        });
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Unable to update Subsection",
            error: error.message,
        })
    }
}

exports.deleteSubSection = async(req, res) => {
    try {
        const { subSectionId, sectionId, courseId } = req.body
        await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId,
            },
        }, {new: true});

        const subSection = await SubSection.findById(subSectionId);
        if(subSection?.video?.id) {
            await cloudinary.uploader.destroy(subSection.video.id, {resource_type: "video"});
        }

        await SubSection.findByIdAndDelete(subSectionId);
        
        const courseDetails = await Course.findById(courseId).populate({ 
            path: "courseContent", 
            populate: {
                path: "subSection"
            }
        }).exec();
        
        return res.status(200).json({
            success: true,
            message: "Subsection Deleted successfully",
            courseDetails
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Subsection",
            error: error.message,
        })
    }
}