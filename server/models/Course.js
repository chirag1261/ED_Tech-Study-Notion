const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    whatYouWillLearn: {
        type: String,
        required: true,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        url: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    tags: {
        type: [String],
        required: true,
    },
    studentEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    status: {
        type: String,
        enum: ["Draft", "Published"]
    },
	instructions: {
		type: [String],
	},
}, {timestamps: true})

module.exports = mongoose.model("Course", courseSchema);