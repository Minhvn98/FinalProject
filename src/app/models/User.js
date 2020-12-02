
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    // phone: String,
    // avatar: String,
    // rank: Number,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
