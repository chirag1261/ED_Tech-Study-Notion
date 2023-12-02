const express = require("express");
const app = express();

const database = require("./config/database");
require("dotenv").config();
const cookieParse = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

//ROUTES
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payment");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
const reach = require("./routes/reach");

database.connect();

//Middlewares
app.use(express.json());
app.use(cookieParse());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/reach", reach);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Service is Accepting Connections on Port: ${PORT}`);
});

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server database is running successfully",
  });
});
