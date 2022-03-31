const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const verify = require('../verifyToken')

//UPDATE USER
router.put('/:id',verify, async (req, res) => {
  //we will not verify by id instead we wiil use the token to verify the user
  //      || means or

  //if this condition satisfy we are allowed to update the user
  if (req.user.id === req.params.id || req.user.isAdmin) {
    //checking if user is changing the password or not because new password should be becrypted
    if (req.body.password) {
      //generate salt to hash the password
      const salt = await bcrypt.genSalt(10)

      //hash the password
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
      res.status(500).json({ error })
    }
  } else {
    res.status(403).json({ msg: 'Access denied' })
  }
})

//GELETE USER

//GET A USER

//GET ALL USERS

//GET USER STATISTICS

module.exports = router
