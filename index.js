const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config() //import and config

//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connection successful')
  })
  .catch((err) => {
    console.log(err)
  })

//app listening on port
app.listen(5000, () => {
  console.log('Server Running at port 5000!')
})
