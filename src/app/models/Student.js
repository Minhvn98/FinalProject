const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, default: '12345678'},
    birthday: String,
    facebook: String,
    avatar: { type: String, default: '/images/user.png' },
    listCourses: [
      {
        idCourse: { type: Schema.Types.ObjectId, ref: 'Course', unique: true },
        nameCourse: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);
