// controllers/reviews.js

const Review = require('../models/review');

module.exports = function(app, Review) {

    // we're using the database with the model: Review
    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('reviews-index', { reviews: reviews });
            })
            .catch(err => {
                console.log(err);
            });
    });

}
