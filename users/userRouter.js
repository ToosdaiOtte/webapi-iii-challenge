const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log('wheres the logger?');
    next();
})

router.post('/', (req, res) => {
    const newUser = req.body;

    if('name' in newUser === false){
        res.status(404).json({
            message: 'Please include a name'
        })
    } else {
        Users.insert(newUser)
        .then(user => {
            res.status(201).json(user);           
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error adding user',
                err
            });
        });        
    }
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
    // const {id} = req.params;
    // Users.getById(id)
    // .then(user => {
    //     if(user){
    //         res.status(200).json(user)
    //     }else {
    //         res.status(404).json({
    //             message: 'User ID not valid'
    //         })
    //     }
    // })
    // .catch(err => {
    //     res.status(500).json({
    //         message: 'Error fetching user',
    //         err
    //     })
    // })
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

router.delete('/:id', (req, res) => {

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

};

function validatePost(req, res, next) {

};

module.exports = router;
