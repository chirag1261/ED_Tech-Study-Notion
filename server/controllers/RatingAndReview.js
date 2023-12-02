const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async(req, res) => {
    try {
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentEnrolled: {$elemMatch: {$eq: userId}}
        });

        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Student is not enrolled in the course",
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        })

        if(alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed",
            })
        }

        if(!rating || !review) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        const ratingDetails = await RatingAndReview.create({
            user: userId,
            rating,
            review,
            course: courseId
        });

        //Add rating to course
        await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingDetails._id,
            }
        }, {new: true})

        return res.status(200).json({
            success: true,
            ratingDetails: ratingDetails,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create rating",
            error: error.message
        })
    }
}

exports.getAverageRating = async(req, res) => {
    try {
        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])

        //return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }
        
        //if no rating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get avg. rating",
            error: error.message
        })
    }
}

exports.getAllRatingReview = async(req, res) => {
    try {
        const allReviews = await RatingAndReview.find({}).sort({rating: "desc"})
        .populate({
            path: "user",
            select: "firstName lastName email image"
        })
        .populate({
            path: "course",
            select: "courseName"
        }).exec();

        return res.status(200).json({
            success: true,
            allReviews
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get ratings",
            error: error.message
        })
    }
}