const express = require('express');
const app = express();
// const authRouter = require('./Routes/authRoute');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Middleware
app.use(cors());

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
// app.use('/', authRouter)

fs.readdirSync(`${__dirname}/Routes`).map((file) => {
    app.use('/', require(path.join(__dirname, '/Routes', file).replace('.js', '')));
});

// app.get('/register', (req, res) => {
//     return res.render('dashboard/register.ejs', {
//         title: 'Register'
//     });
// });


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});