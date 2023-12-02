const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const mongoose = require("mongoose");
require("dotenv").config();
const crypto = require("crypto");

exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.status(400).json({success: false, message: "Please provide courseId"});
    }

    let totalAmount = 0;
    // console.log(courses);
    for(const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(400).json({success: false, message: "Could not find the course"});
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)) {
                return res.status(400).json({ success: false, message:"Student is already Enrolled!"})
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success: false, message:error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(), 
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: "Payment Successfull",
            data: paymentResponse
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false, message:error.message
        })
    }
    
}

exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.json({success: false, message: "Payment Failed"});
    }

    let body =  razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature === razorpay_signature) {
        enrollStudent(courses, userId, res);
        return res.status(200).json({success: true, message: "Payment Verified"});
    }

    return res.status(500).json({success: false, message: "Payment Failed"});
}

const enrollStudent = async(courses, userId, res) => {
    if(!courses || !userId) {
        return res.status(400).json({success: false, message: "Please provide data for courseId or userId"});
    }

    for(const courseId of courses) {
        try {
            //find the course and enroll the student in it.
            const enrolledCourse = await Course.findByIdAndUpdate({_id: courseId}, {
                $push: {
                    studentEnrolled: userId
                },
            }, {new: true}); 

            if(!enrolledCourse) {
                return res.status(400).json({success: false, message: "Course not found"});
            }

            //Set Progress
            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            })

            //find the student and add the course to their list of enrolledCourses
            const enrolledStudent = await User.findByIdAndUpdate(userId, {
                $push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                },
            }, {new: true});

            //Send mail to the student
            const emailResponse = await mailSender(process.env.MAIL_USER, enrolledStudent.email, `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName + " " + enrolledStudent.lastName)
            );
            // console.log("Email Sent Successfullt", emailResponse);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success: false, message: error.message});
        }
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;
    
    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success: false, message: "Please provide all the fields"})
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(process.env.MAIL_USER, enrolledStudent.email, 'Payment Received - StudyNotion', paymentSuccessEmail(enrolledStudent.firstName + " " + enrolledStudent.lastName, (amount / 100), orderId, paymentId));
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not send mail"
        })
    }
}
