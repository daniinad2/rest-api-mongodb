const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    _id: String,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Posts', PostSchema)
