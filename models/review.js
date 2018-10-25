// models/review.js

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String,
  rating: Number
});

module.exports = Review;
