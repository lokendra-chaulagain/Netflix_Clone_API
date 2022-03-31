const router = require('express').Router() //Router method
const User = require('../models/User')
const bcrypt = require('bcrypt')

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
    const user = await newUser.save()
    res.status(200).json(user)

    //if error occurs catch it
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router
