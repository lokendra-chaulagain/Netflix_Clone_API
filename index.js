const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const cookieParser = require("cookie-parser");

app.use(express.json());
//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(cookieParser());
app.use("/api/auth/", authRoute);
app.use("/api/users/", userRoute);
app.use("/api/movies/", movieRoute);

//Error handling middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

//app listening on port
app.listen(5000, () => {
  console.log("Server Running at port 5000!");
});
