const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    categories: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    videoId: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    slug: { type: String, slug: "name", unique: true },
    lecture: { lectureId: Schema.Types.ObjectId, name: String },
    listStudent: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    homeworks: [{ type: Schema.Types.ObjectId, ref: "HomeWork" }],
    youCanLearn: [{ type: Schema.Types.ObjectId, ref: "YouCanLearn" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
