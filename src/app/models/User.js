
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    avatar: String,
    rank: Number,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
