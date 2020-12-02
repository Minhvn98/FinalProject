
const mongoose = require('mongoose');
const { Schema } = mongoose;

const LectureSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    categories: String,
    avatar: String,
    description: String,
    password: String,
    birthday: String,
    facebook: String,
    listCourse: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    listStudent: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

module.exports = mongoose.model('Lecture', LectureSchema);


