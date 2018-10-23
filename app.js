// initializing handlebars.js
var exphbs = require('express-handlebars');

const express = require('express')
const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    // extending the root route ('/') to render home.handlebars
    res.render('home', { msg: 'Handlebars are Cool!' });
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
