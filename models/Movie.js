const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  desc: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    default: "",
  },

  imgTitle: {
    type: String,
  },

  imgSm: {
    type: String,
    default: "",
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
    enum: [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Horror",
      "Romance",
      "Science Fiction",
      "Thriller",
      "Western",
    ],
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
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: ["Movie", "Series"],
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
