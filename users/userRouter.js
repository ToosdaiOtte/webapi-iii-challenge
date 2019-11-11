const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log('wheres the logger?');
    next();
})

router.post('/', validateUser, (req, res) => {
    res.status(201).json(req.user);
});

router.post('/:id/posts', validateUserId, (req, res) => {
    const postInfo = {...req.body, user_id: req.params.id};

    if(!postInfo.text){
        res.status(400).json({
            message: 'Please provide text for the post'
        })
    } else {
        Posts.insert(postInfo)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding post to user',
                err
            })
        })        
    }
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

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
    const {id} = req.params;

    Users.remove(id)
    .then(user => {
        res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error deleting user',
            err
        });
    });
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params;
    Users.getById(id)
    .then(user => {
        if(user){
            req.user = user;
            next();
        } else{
            res.status(404).json({ message: 'user does not exist'});
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error validating user id',
            err
        })
    })

};

function validateUser(req, res, next) {
    const userInfo = req.body;
  
    if (!userInfo.name) {
        res.status(400).json({ message: "Name required" });
    } else {
      Users.insert(userInfo)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
          res
            .status(500).json({ 
                message: "Error adding user",
                err 
            });
        });
    }
};

function validatePost(req, res, next) {

};

module.exports = router;
