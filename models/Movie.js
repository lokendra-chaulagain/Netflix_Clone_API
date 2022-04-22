const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  desc: {
    type: String,
  },

  img: {
    type: String,
    default: '',
  },

  imgTitle: {
    type: String,
  },

  thumbnailIMg: {
    type: String,
    default: '',
  },

  trailer: {
    type: String,
  },

  video: {
    type: String,
  },

  genre: {
    type: String,
  },

  year: {
    type: Number,
  },

  rating: {
    type: Number,
  },

  duration: {
    type: Number,
    trim: true,
  },

  ageLimit: {
    type: Number,
  },

  isSeries: {
    type: Boolean,
    default: false,
  },
  
})

module.exports = mongoose.model('Movie', MovieSchema)
