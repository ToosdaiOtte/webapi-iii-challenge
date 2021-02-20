const express = require('express');
const Posts = require('./posts/postDb.js');

const postRouter = express.Router();

router.get('/', (req, res) => {
    Posts.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving posts',
            err
        })
    })
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = postRouter;