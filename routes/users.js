const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//Update
router.put("/update/:id", async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //update the password
      req.body.password = hashedPassword;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted successfully");
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(403).json("you can only delete your account");
  }
});

//Get
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(500).json("user not found");
  }
});

//GET ALL USERS
router.get("/", async (req, res) => {
  const query = req.query.new;

  if ((req.user.isAdmin = true)) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json("user not found");
    }
  } else {
    res.status(403).json("you are not allowed to see all users");
  }
});

//export
module.exports = router;
