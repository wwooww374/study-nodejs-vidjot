// This file defines authentication strategies

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'},
        (email, password, done) => {
            User.findOne({
                email: email
            }).then(user => {
                if(!user) {
                    return done(null, false, {message:'존재하지 않는 이메일 입니다.'});
                }

                // match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                    }
                });
            });
        }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
        });
        
        passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
        });
}