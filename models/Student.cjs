// models/Student.js
const mongoose = require('mongoose');

// Schema for a student
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  profileImageUrl: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);