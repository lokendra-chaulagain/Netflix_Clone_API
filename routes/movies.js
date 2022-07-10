const router = require("express").Router();
const Movie = require("../models/Movie");
const { verifyAdmin } = require("../utils/verifyToken");

//Create
router.post("/create",verifyAdmin, async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update
router.put("/update/:id",verifyAdmin, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/delete/:id",verifyAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie has been deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get a movie
router.get("/get/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET all movies
router.get("/all", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Gwt movie according to genre
router.get("/genre/:genre", async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get movie according to category
router.get("/category/:category", async (req, res) => {
  try {
    const movies = await Movie.find({ category: req.params.category });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Search movies by title work for both uppercase and lowercase
router.get("/search/:title", async (req, res) => {
  try {
    const movies = await Movie.find({ title: { $regex: req.params.title } });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});



//Latest
router.get("/latest", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});



//Latest5
router.get("/latest5", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
