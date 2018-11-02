// models/comment.js

// need mongoose to create the new model
const mongoose = require('mongoose')
// getting the reference from the Mongoose Schema Object
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
    // the value of this reviewId is a reference to another model 'Review'
});

// exports the comment object by attaching it to module.exports
module.exports = Comment
