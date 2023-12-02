const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async(req, res) => {
    try {
        const {name, description} = req.body;

        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const catDetails = await Category.create({
            name: name,
            description: description,
        });
        // console.log(catDetails);

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            catDetails,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.showAllCategories = async(req, res) => {
    try {
        const allCategories = await Category.find({}, {name: true, description: true});
        return res.status(200).json({
            success: true,
            allCategories
        })
    }
    catch(error) { 
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.categoryPageDetails = async(req, res) => {
    try {
        const {categoryId} = req.body;

        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: [
                { path: "ratingAndReviews", populate: { path: "user" }},
            ],
            populate: {
                path: "instructor",
            },
        })
        .exec()

        if(!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            id: { $ne: categoryId },
        });

        let differentCategory = await Category.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id)
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: [
                { path: "ratingAndReviews", populate: { path: "user" }},
            ],
            populate: {
                path: "instructor",
            },
        }).exec()

        
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: [
                { path: "ratingAndReviews", populate: { path: "user" }},
            ],
            populate: {
                path: "instructor",
            },
        }).exec();
        
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
        
        return res.status(200).json({
            success: true,
            data : {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            }
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some problem occured!",
            error: error.message,
        })
    }
}