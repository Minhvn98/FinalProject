
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequirementSchema = new Schema({
    idCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
    content: String,
}, { timestamps: true });

module.exports = mongoose.model('Requirement', RequirementSchema);
