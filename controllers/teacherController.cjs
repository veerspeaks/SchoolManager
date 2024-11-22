// controllers/teacherController.js
const Teacher = require('../models/Teacher.cjs');

exports.createTeacher = async (req, res) => {
  try {
    const teachersData = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's always an array

    for (const eachTeacher of teachersData) {
      const { name, email, subject } = eachTeacher;
      const profileImageUrl = req.file ? req.file.path : undefined;

      const teacher = new Teacher({
        name,
        email,
        subject,
        profileImageUrl,
      });

      try {
        await teacher.save();
      } catch (err) {
        if (err.code === 11000) {
          // Duplicate email error
          return res.status(400).json({ message: `Email ${email} already exists.` });
        } else {
          throw err; // Re-throw other errors to be caught by the outer catch block
        }
      }
    }

    res.status(201).json("Teachers created successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    
    const { page = 1, limit = 10 } = req.query;
    

    const teachers = await Teacher.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { name, email, subject } = req.body;
    const profileImageUrl = req.file ? req.file.path : undefined;

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    if (name) teacher.name = name;
    if (email) teacher.email = email;
    if (subject) teacher.subject = subject;
    if (profileImageUrl) teacher.profileImageUrl = profileImageUrl;

    await teacher.save();
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    teacher.isDeleted = true;
    await teacher.save();
    res.json({ message: 'Teacher deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};