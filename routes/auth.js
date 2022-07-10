const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

const JWT_SECRET = process.env.JWT_SECRET;

//Register
router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    return next(createError(500, "Server Error"));
  }
});

//Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7h" }
        );
        //now saving the token in the cookies
        const { password, ...others } = user._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(others);
      } else {
        toast.error("Login Failed", { theme: "colored" });
        return next(createError(401, "Invalid password"));
      }
    } else {
      return next(createError(401, "User not found "));
    }
  } catch (error) {
    return next(createError(500, "Server Error"));
  }
});

module.exports = router;
