
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Student = new Schema({
    name: { type: String, required = true },
    phone: { type: String, required = true },
    email: { type: String, require = true },
    coursesId: [ ObjectId ],
});

module.exports = mongoose.model('Student', Student);
