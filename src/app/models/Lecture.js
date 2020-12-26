const mongoose = require('mongoose');
const { Schema } = mongoose;

const LectureSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: { type: String, default: '12345678'},
    categories: String,
    avatar: { type: String, default: '/images/user.png' },
    description: String,
    birthday: String,
    facebook: String,
    listCourse: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    listStudent: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lecture', LectureSchema);
