const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// load Idea model
require('../models/Idea');
const Idea = mongoose.model('ideas');

router.get('/', (req, res) => {
    Idea.find({})
        .sort({date:'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

router.get('/add', (req, res) => {
    res.render('ideas/add')
});

router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        res.render('ideas/edit', {
            idea: idea
        });
    });
});

router.post('/', (req, res) => {
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

router.put('/ideas/:id', (req, res) => {
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

router.delete('/ideas/:id', (req, res) => {
    Idea.remove({
        _id: req.params.id
    }).then(() => {
        req.flash('success_msg', '아이디어가 삭제되었습니다');
        res.redirect('/ideas');
    });
});

module.exports = router;