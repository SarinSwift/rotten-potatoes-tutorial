// initializing handlebars.js
var exphbs = require('express-handlebars');

const express = require('express')
const app = express()
// initialize body parser and add it to app
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// initialize mongoose
const mongoose = require('mongoose');
// connect to our database that is named after our app
mongoose.connect('mongodb://localhost/rotten-potatoes');

// model is capitalized and singular (models are stored on the database)
const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String,
  rating: Number
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

// making a route to /reviews/new and have it render a template called reviews-new
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
    // we use the method create() to create the review
    Review.create(req.body).then((review) => {
        console.log(review);
        // then we redirect the root path to see the new review
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
