// initializing handlebars.js
var exphbs = require('express-handlebars');

const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
// initialize body parser and add it to app
const bodyParser = require('body-parser');

const Review = require('./models/review');
const reviews = require('./controllers/reviews')(app, Review);


app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
// now we can create the update method
app.use(methodOverride('_method'))




app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
        // remove then redirect to the homepage
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})


app.listen(port);
// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// })

module.exports = app;
