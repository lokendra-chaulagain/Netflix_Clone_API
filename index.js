const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config() 
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')


//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connection successful')
  })
  .catch((err) => {
    console.log(err)
  })


// Middleware
app.use(express.json()) //accept json data
app.use('/api/auth/', authRoute)
app.use('/api/users/', userRoute)


//app listening on port
app.listen(5000, () => {
  console.log('Server Running at port 5000!')
})
