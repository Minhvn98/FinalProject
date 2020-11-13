
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Lecture = new Schema({
    name: String,
    email: String,
    phone: String,
    categories: String,
    avatar: String,
    description: String,
    listCourse: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    listStudent: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

module.exports = mongoose.model('Lecture', Lecture);


