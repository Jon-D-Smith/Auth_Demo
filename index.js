const express = require('express');
const app = express();
const PORT = 3000;
const User = require('./models/user');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected')
    })
    .catch(err => {
        console.log('Oh no, error')
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('this is the home page')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        res.send("Yay, welcome!")
    } else {
        res.send('try again')
    }

})

app.get('/secret', (req, res) => {
    res.send('You cannot see me unless you are logged in.')
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})