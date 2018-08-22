const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing at registration
const passport = require('passport');
const {ensureNotAuthenticated} = require('../helpers/auth');

// load User model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', ensureNotAuthenticated, (req, res) => {
    res.render('users/login');
});

router.get('/register', ensureNotAuthenticated, (req, res) => {
    res.render('users/register');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', '로그아웃 되었습니다');
    res.redirect('/users/login');
});

// login form
router.post('/login', (req, res, next) => {
    // connect to local strategy
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// registration form
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
        // email existence check
        User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    req.flash('error_msg', '이미 존재하는 이메일입니다');
                    res.redirect('/users/register');
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body. email,
                        password: req.body.password
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', '회원가입이 완료되었습니다. 로그인해주세요.');
                                        res.redirect('/users/login');
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return;
                                    });
                        });
                    });
                }
            });
    }
});

module.exports = router;