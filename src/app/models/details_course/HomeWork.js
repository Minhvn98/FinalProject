
const mongoose = require('mongoose');
const { Schema } = mongoose;

const HomeWorkSchema = new Schema({
    idCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    path: String,
}, { timestamps: true });

module.exports = mongoose.model('HomeWork', HomeWorkSchema);