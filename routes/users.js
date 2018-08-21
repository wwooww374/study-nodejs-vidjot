const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/login', (req, res) => {
    res.send('LOGIN');
});

router.get('/register', (req, res) => {
    res.send('REGISTER');
});

module.exports = router;