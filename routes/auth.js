const router = require("express").Router(); //Router method
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");
const JWT_SECRET = process.env.JWT_SECRET;

//REGISTER
router.post("/register", verify, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //saving the user
    const user = await newUser.save();
    return res.status(200).json(user);

    //if error occurs catch it
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json(" msg: User not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json("msg: 'Password didn't  match");
    }
    //if password is match create a token
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      JWT_SECRET,
      { expiresIn: "10d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
