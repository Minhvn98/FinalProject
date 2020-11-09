
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Lecture = new Schema({
    name: String,
    email: String,
    phone: String,
    categories: String,
    avatar: String,
    description: String,
    numOfCourse: Number,
    numOfStudent: Number,
    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Lecture', Lecture);


