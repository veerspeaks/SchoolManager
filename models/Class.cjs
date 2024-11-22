const mongoose = require('mongoose');


// Schema for a class
const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    studentCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Class', classSchema);

