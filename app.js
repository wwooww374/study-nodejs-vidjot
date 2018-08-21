const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// connect to mongoose
mongoose.connect('mongodb://localhost/study-nodejs-vidjot', {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.log(err);
});

// express-handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// method-override middleware
app.use(methodOverride('_method'));

// express-session middleware
app.use(session({
    secret: 'cute cats',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

// global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

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


// user routes
app.use('/ideas', ideas);
app.use('/users', users);


const port = 5000;

app.listen(port, () => {    // arrow function (ES6)
    console.log(`Server started on port ${port}...`);   // string embedding (ES6)
    // console.log('Server started on ' + port + '...');
});