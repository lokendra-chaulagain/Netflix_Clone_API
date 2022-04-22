const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const verify = require('../verifyToken')
const jwt = require('jsonwebtoken')


//UPDATE USER
router.put('/:id', verify, async (req, res) => {
  //we will not verify by id instead we wiil use the token to verify the user
  //      || means or

  //if this condition satisfy we are allowed to update the user
  if (req.user.id === req.params.id || req.user.isAdmin) {
    //checking if user is changing the password or not because new password should be becrypted
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)

      //update the password
      req.body.password = hashedPassword
    }

    try {
      //update the user
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      )
      res.status(200).json(updatedUser)

    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json('You can update only your account')
  }
})


//GELETE USER
router.delete('/:id', verify, async (req, res) => {
  //checking if  the user is owner/admin or not
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      //delete the user
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User has been deleted successfully' )

      //if error occurs catch it
    } catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(403).json('you can only delete your account' )
  }
})


//GET A USER
router.get('/find/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)

    //we dont want to show all info only few info
    const { password, ...others } = user._doc
    res.status(200).json({ others })

    //if user not found
  } catch (error) {
    res.status(500).json('user not found')
  }
})


//GET ALL USERS
router.get('/', verify, async (req, res) => {
  //query
  const query = req.query.new //fetching new user only
  //only admin can see all users
  if (req.user.isAdmin = true) {
    try {
      const users = query ? await User.find().sort({_id:-1}).limit(2) : await User.find()

      res.status(200).json(users)

      //if user not found
    } catch (error) {
      res.status(500).json('user not found')
    }
  } else {
    res.status(403).json('you are not allowed to see all users')
  }
})


//GET USER STATISTICS

module.exports = router
