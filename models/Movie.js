const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  thumbnail: {
    type: String,
    default: "",
    required: true,
  },

  trailer: {
    type: String,
    default: "",
    required: true,
  },

  video: {
    type: String,
    default: "",
    required: true,
  },

  genre: {
    type: String,
    required: true,
    enum: [
      "Adventure",
      "Animation",
      "Crime",
      "Documentary",
      "Horror",
      "Romance",
      "Science-Fiction",
      "Thriller",
    ],
  },

  releasedYear: {
    type: Number,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  ageLimit: {
    type: String,
    required: true,
    enum: ["16+", "18+", "Everyone"],
  },

  category: {
    type: String,
    required: true,
    enum: ["movies", "series", "kids"],
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
