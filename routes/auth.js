const router = require('express').Router() //Router method
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verify = require('../verifyToken')
const dotenv = require('dotenv').config()

//REGISTER
router.post('/register', async (req, res) => {
  try {
    //generate salt to hash the password
    const salt = await bcrypt.genSalt(10)

    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    //saving the user
    const user = await newUser.save()
    //if error occured during saving the user
    return res.status(200).json(user)

    //if error occurs catch it
  } catch (error) {
    res.status(500).json({ error })
  }
})

//LOGIN
router.post('/login', async (req, res) => {
  try {
    //find the user by email
    const user = await User.findOne({ email: req.body.email }) //req.body.email means the email given by the user

    //if user not found return error
    if (!user) {
      return res.status(400).json({ msg: 'User not found' })
    }

    //If user found then compare the password given by user with hashed password in database
    const validPassword = await bcrypt.compare(req.body.password, user.password) //req.body.password means the password given by the user and user.password means the hashed password in database

    //if password is not match return error
    if (!validPassword) {
      return res.status(400).json({ msg: 'Password is not match' })
    }

    //if password is match create a token//it will hide this info into the token------
    const accessToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },

      // process.env.TOKEN_SECRET,
      process.env.SECRET,
      
      { expiresIn: '10d' }, //after this days the token will be expired so we should login again
    )
    //------------------------------------------------------------------------

    //things that shouldnot be visible to the user
    const { password, ...others } = user._doc //password private other show to the user

    //if user is found and password is match return user
    res.status(200).json({ ...others, accessToken })

    //if error catch it and show error
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
