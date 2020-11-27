
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    idUser: { type: Schema.Types.ObjectId },
    idCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
    content: String,
    timestamp: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Comment', Comment);
 