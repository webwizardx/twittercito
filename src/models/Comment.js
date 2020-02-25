const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    email: { type: String },
    name: { type: String },
    text: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = model('Comment', CommentSchema);