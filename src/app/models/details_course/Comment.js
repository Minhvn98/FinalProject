const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema(
  {
    idUser: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    idCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
    content: String,
    onModel: {
      type: String,
      enum: ['Student', 'Lecture', 'Admin'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', Comment);
