const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const mongoose = require('mongoose')

// GET: get all the docs from "posts" collection
router.get('/', async (req, res) => {
    try {
        await Post.find().then((data) => {
            console.log(
                'HTTP 200: Succeful GET request from ' +
                    req.socket.remoteAddress,
            )
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// GET: get a doc by ID from "posts" collection
router.get('/:postId', async (req, res) => {
    try {
        await Post.findById(req.params.postId).then((data) => {
            console.log(
                'HTTP 200: Succeful GET request from ' +
                    req.socket.remoteAddress,
            )
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// POST: save a doc to "posts" collection
router.post('/', async (req, res) => {
    const post = new Post(
        {
            title: req.body.title,
            description: req.body.description,
        },
        { collection: 'posts' },
    )

    post._id = new mongoose.Types.ObjectId()._id

    await post
        .save()
        .then((data) => {
            console.log(
                'HTTP 200: Succeful POST request from ' +
                    req.socket.remoteAddress,
            )
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)

            if ('MongooseError' === err.name) {
                res.status(500).json({
                    message: 'Server error. Could not handle your post request',
                })
            } else {
                res.status(400).json({
                    message: err,
                })
            }
        })
})

// DELETE: delete a doc by ID from "posts" collection
router.delete('/:postId', async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.postId }).then((data) => {
            console.log(
                'HTTP 200: Succeful DELETE request from ' +
                    req.socket.remoteAddress,
            )
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

module.exports = router
