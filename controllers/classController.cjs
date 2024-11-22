// controllers/classController.js
const Class = require('../models/Class.cjs');
const Student = require('../models/Student.cjs');

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    const classObj = new Class({
      name,
      teacherId,
    });

    await classObj.save();
    res.status(201).json(classObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const classes = await Class.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('teacherId')
      .exec();

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a class by ID
exports.getClassById = async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id).populate('teacherId');
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found.' });
    }
    res.json(classObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    const classObj = await Class.findById(req.params.id);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    if (name) classObj.name = name;
    if (teacherId) classObj.teacherId = teacherId;

    await classObj.save();
    res.json(classObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    // Optionally, we can also handle deletion of associated students, etc.

    await classObj.remove();
    res.json({ message: 'Class deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};