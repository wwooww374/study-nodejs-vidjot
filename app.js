const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

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

app.get('/ideas', (req, res) => {
    Idea.find({})
        .sort({date:'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
});

app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        res.render('ideas/edit', {
            idea: idea
        });
    });
});

app.post('/ideas', (req, res) => {
    let errors = [];

    // access the request object by 'body-parser' middleware
    if(!req.body.title) {
        errors.push({text: '제목을 입력하세요'});
    }

    if(errors.length > 0){
        res.render('ideas/add', {
            errors: errors,
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', '새 아이디어가 등록되었습니다');
                res.redirect('/ideas');
            });
    }
});

app.put('/ideas/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save()
            .then(idea => {
                req.flash('success_msg', '아이디어가 수정되었습니다');
                res.redirect('/ideas');
            });
    });
});

app.delete('/ideas/:id', (req, res) => {
    Idea.remove({
        _id: req.params.id
    }).then(() => {
        req.flash('success_msg', '아이디어가 삭제되었습니다');
        res.redirect('/ideas');
    });
});


const port = 5000;

app.listen(port, () => {    // arrow function (ES6)
    console.log(`Server started on port ${port}...`);   // string embedding (ES6)
    // console.log('Server started on ' + port + '...');
});