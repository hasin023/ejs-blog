require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// PORT
const PORT = process.env.APP_PORT || 3000;

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

// Static Files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Use Routes
app.use('/', authRouter)
app.use('/', dashboardRouter)

app.get('/', (req, res) => {
    return res.render('root.ejs', {
        title: 'Root'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});