const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// connect to mongoose
mongoose.connect('mongodb://localhost/study-nodejs-vidjot', {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.log(err);
});

// load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// express-handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => {
    const title = 'Welcome~';
    res.render('index', {
        title: title
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});


const port = 5000;

app.listen(port, () => {    // arrow function (ES6)
    console.log(`Server started on port ${port}...`);   // string embedding (ES6)
    // console.log('Server started on ' + port + '...');
});