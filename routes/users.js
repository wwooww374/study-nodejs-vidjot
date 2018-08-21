const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', (req, res) => {
    // password validation check
    let errors = [];
    if(req.body.password != req.body.password_confirm) {
        errors.push({text: '비밀번호가 일치하지 않습니다'});
    }
    if(req.body.password.length < 6) {
        errors.push({text: '비밀번호는 6자리 이상이어야 합니다'});
    }
    if(errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password_confirm: req.body.password_confirm
        });
    } else {
        res.send('PASSED');
    }
})

module.exports = router;