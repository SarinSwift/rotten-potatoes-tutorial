// initializing handlebars.js
var exphbs = require('express-handlebars');

const express = require('express')
const app = express()

// initialize mongoose
const mongoose = require('mongoose');
// connect to our database that is named after our app
mongoose.connect('mongodb://localhost/rotten-potatoes');

// model is capitalized and singular (models are stored on the database)
const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String
});

// // mock array of movies
// let reviews = [
//     { title: "Great review", movieTitle: "Titanic" },
//     { title: "Awesome movie", movieTitle: "Interstellar" },
//     { title: "Poor quality", movieTitle: "Life of Pie" }
// ]

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// we're using the database with the model: Review
app.get('/', (req, res) => {
    // .find() returns a Promise
    Review.find()
     .then(reviews => {
         res.render('reviews-index', { reviews: reviews });
     })
     .catch(err => {
         console.log(err);
     })
})

app.get('/', (req, res) => {
    // extending the root route ('/') to render home.handlebars
    res.render('home', { msg: 'Handlebars are Cool!' });
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
