const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubmitHomeworkSchema = new Schema(
  {
    idCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
    idStudent: { type: Schema.Types.ObjectId, ref: 'Student' },
    idHomework: { type: Schema.Types.ObjectId, ref: 'HomeWork' },
    content: String,
    path: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubmitHomework', SubmitHomeworkSchema);
