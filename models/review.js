// models/review.js



const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String,
  rating: Number
});

module.exports = Review;
