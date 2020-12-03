
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    avatar: String,
    password: String,
    facebook: String,
    birthday: String
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);

