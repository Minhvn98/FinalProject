
const mongoose = require('mongoose')
const { Schema } = mongoose;

const Course = new Schema({
    name: { type: String, required = true },
    description: { type: String, required = true },
    videoId: { type: String, required = true },
    lectureID: { type: ObjectId, required = true },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Course', Course);
