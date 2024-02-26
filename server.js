const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const fs = require('fs');

// Port
const PORT = process.env.PORT || 3000;

// Routes
const authRouter = require('./Routes/authRoute');
const dashboardRouter = require('./Routes/dashboardRoute');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

// Session
app.use(session({
    secret: 'randomsecret2345voice55',
    resave: true,
    saveUninitialized: true
}));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', authRouter)
app.use('/', dashboardRouter)

// fs.readdirSync(`${__dirname}/Routes`).map((file) => {
//     app.use('/', require(path.join(__dirname, '/Routes', file).replace('.js', '')));
// });

// app.get('/dashboard', (req, res) => {
//     return res.render('dashboard/index.ejs', {
//         title: 'Dashboard',
//         user: {}
//     });
// });


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});