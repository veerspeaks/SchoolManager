// controllers/studentController.js
const Student = require('../models/Student.cjs');

exports.createStudent = async (req, res) => {
  try {
    const studentsData = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's always an array

    for (const eachStudent of studentsData) {
      const { name, email, classId } = eachStudent;
      const profileImageUrl = req.file ? req.file.path : undefined;

      const student = new Student({
        name,
        email,
        classId,
        profileImageUrl,
      });

      try {
        await student.save();
      } catch (err) {
        if (err.code === 11000) {
          // Duplicate email error
          return res.status(400).json({ message: `Email ${email} already exists.` });
        } else {
          throw err; // Re-throw other errors to be caught by the outer catch block
        }
      }
    }

    res.status(201).json("Students created successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, classId } = req.query;
    const filter = { isDeleted: false };
    if (classId) {
      filter.classId = classId;
    }

    const students = await Student.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('classId')
      .exec();

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('classId');
    if (!student || student.isDeleted) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, email, classId } = req.body;
    const profileImageUrl = req.file ? req.file.path : undefined;

    const student = await Student.findById(req.params.id);
    if (!student || student.isDeleted) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    if (name) student.name = name;
    if (email) student.email = email;
    if (classId) student.classId = classId;
    if (profileImageUrl) student.profileImageUrl = profileImageUrl;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || student.isDeleted) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    student.isDeleted = true;
    await student.save();
    res.json({ message: 'Student deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};