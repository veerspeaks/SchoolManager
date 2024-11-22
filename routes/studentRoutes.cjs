// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController.cjs');
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const upload = require('../utils/multer.cjs');

//Create a new student  
router.post('/', authMiddleware, upload.single('profileImage'), studentController.createStudent);

//Get all students
router.get('/', authMiddleware, studentController.getStudents);

//Get a student by ID
router.get('/:id', authMiddleware, studentController.getStudentById);

//Update a student
router.put('/:id', authMiddleware, upload.single('profileImage'), studentController.updateStudent);

//Delete a student
router.delete('/:id', authMiddleware, studentController.deleteStudent);

module.exports = router;