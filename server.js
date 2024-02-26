const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const path = require('path');
// const fs = require('fs');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

// Port
const PORT = process.env.PORT || 3000;

// Routes
const authRouter = require('./Routes/authRoute');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

// Session
app.use(session({
    secret: 'randomsecret2345voice55',
    resave: true,
    saveUninitialized: true
}));

// Flash
app.use(flash());

// Set Views
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
        title: 'Login',
        user: {
            email: 'asdf@gmail.com',
            password: 'holysmokes'
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});