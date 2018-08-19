const express = require('express');     // bring the package 'express'

const app = express();

app.use((req, res) => {
    console.log('This is a middleware function');
    // next();      // call next middleware functions
})

// routes
app.get('/', (req, res) => {
    res.send('INDEX');
});

app.get('/about', (req, res) => {
    res.send('ABOUT');
});


const port = 5000;

app.listen(port, () => {    // arrow function (ES6)
    console.log(`Server started on port ${port}...`);   // string embedding (ES6)
    // console.log('Server started on ' + port + '...');
});