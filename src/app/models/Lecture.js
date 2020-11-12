
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Lecture = new Schema({
    name: String,
    email: String,
    phone: String,
    categories: String,
    avatar: String,
    description: String,
    listCourse: [ Schema.Types.ObjectId ],
    listStudent: [ Schema.Types.ObjectId ],
    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Lecture', Lecture);


