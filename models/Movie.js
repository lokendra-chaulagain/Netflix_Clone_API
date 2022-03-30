const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  img: {
    type: String,
    default: '',
  },

  imgTitle: {
    type: String,
    required: true,
  },

  yhumbnailIMg: {
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
    required: true,
    trim: true,
  },

  year: {
    type: Number,
    required: true,
    trim: true,
  },

  rating: {
    type: Number,
    required: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: true,
    trim: true,
  },

  ageLimit: {
    type: Number,
    required: true,
    trim: true,
  },

  isSeries: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Movie', MovieSchema)
