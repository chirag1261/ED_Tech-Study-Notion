const express = require("express");
const { countactUs } = require("../controllers/ContactUs");
const router = express.Router();

router.post("/contact", countactUs);

module.exports = router;