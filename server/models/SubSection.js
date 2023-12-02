const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    video: {
        url: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    }
})

module.exports = mongoose.model("SubSection", subSectionSchema);