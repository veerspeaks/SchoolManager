const mongoose = require('mongoose');

const teacherScheme = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    profileImageUrl: { type: String },
    
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Teacher', teacherScheme);