
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Student = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, require: true },
    avatar: { type: String, default: "/images/user.png" },
    listCourses: [
      {
        idCourse: { type: Schema.Types.ObjectId, ref: "Course", unique: true },
        nameCourse: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', Student);


