const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const authRouter = require('./Routes/authRoute');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pool = require('./config/db');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', authRouter)

// fs.readdirSync(`${__dirname}/Routes`).map((file) => {
//     app.use('/', require(path.join(__dirname, '/Routes', file).replace('.js', '')));
// });

app.get('/login', (req, res) => {
    return res.render('dashboard/login.ejs', {
        title: 'Login'
    });
});


app.listen(3000, () => {
    console.log('Server is running on port: 3000');
});