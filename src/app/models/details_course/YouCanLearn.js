const mongoose = require("mongoose");
const { Schema } = mongoose;

const YouCanLearnSchema = new Schema(
  {
    idCourse: { type: Schema.Types.ObjectId, ref: "Course" },
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("YouCanLearn", YouCanLearnSchema);
