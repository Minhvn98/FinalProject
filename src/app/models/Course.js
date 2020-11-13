const mongoose = require("mongoose");
const { Schema } = mongoose;

const Course = new Schema({
  name: { type: String, required: true },
  categories: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, required: true },
  lecture: { lectureId: Schema.Types.ObjectId, name: String },
  listStudent: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  videoId: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model("Course", Course);
