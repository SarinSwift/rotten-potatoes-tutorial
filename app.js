// initializing handlebars.js
var exphbs = require('express-handlebars');

const express = require('express')
const methodOverride = require('method-override')
const app = express()
// initialize body parser and add it to app
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
// now we can create the update method
app.use(methodOverride('_method'))

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

// SHOW
// adding a template with an actual review object
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message);
    })
})

// CREATE
app.post('/reviews', (req, res) => {
    // we use the method create() to create the review
    Review.create(req.body).then((review) => {
        console.log(review);
        // then we redirect to reviews/:id
        res.redirect(`/reviews/${review._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
    })
})

// UPDATE
// it will receive requests with a PUT method
app.put('/reviews/:id/', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
