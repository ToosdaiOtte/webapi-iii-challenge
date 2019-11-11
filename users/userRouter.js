const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    Users.get(req.query)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
            message:'Error retrieving the users'
        });
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Users.getById(id)
    .then(user => {
        if(user){
            res.status(200).json(user)
        }else {
            res.status(404).json({
                message: 'User ID not valid'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error fetching user',
            err
        })
    })
});

router.get('/:id/posts', (req, res) => {
    const {id} = req.params
    Users.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error fetching the posts for the user',
            err
        });
    });
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
