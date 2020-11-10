
const mongoose = require('mongoose');
const { schema } = require('./Lecture');
const Schema = mongoose.Schema();

const Comment = new Schema({
    idUser: ObjectId,
    content: String,
    timestamp: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Comment', Comment);
