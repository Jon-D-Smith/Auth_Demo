const express = require('express');
const app = express();
const PORT = 3000;
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/secret', (req, res) => {
    res.send('You cannot see me unless you are logged in.')
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})