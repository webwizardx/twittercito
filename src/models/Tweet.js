const { Schema, model } = require('mongoose');

const TweetSchema = new Schema({
    email: { type: String },
    name: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: Array },
    text: { type: String },
    timestamp: { type: Date, default: Date.now }
});

TweetSchema.virtual('commentsNumber')
    .get(function() { return this.comments.length });

module.exports = model('Tweet', TweetSchema);