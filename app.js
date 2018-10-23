// initializing handlebars.js
var exphbs = require('express-handlebars');

const express = require('express')
const app = express()

// mock array of movies
let reviews = [
    { title: "Great review", movieTitle: "Titanic" },
    { title: "Awesome movie", movieTitle: "Interstellar" }
]

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// we're sending the mock array as an object in the template { reviews: reviews }
app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
})

app.get('/', (req, res) => {
    // extending the root route ('/') to render home.handlebars
    res.render('home', { msg: 'Handlebars are Cool!' });
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
