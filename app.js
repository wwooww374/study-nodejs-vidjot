const express = require('express');     // bring the package 'express'
var exphbs  = require('express-handlebars');

const app = express();

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