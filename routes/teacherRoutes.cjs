// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController.cjs');
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const upload = require('../utils/multer.cjs');

//Create a new teacher
router.post('/', authMiddleware, upload.single('profileImage'), teacherController.createTeacher);

//Get all teachers
router.get('/', authMiddleware, teacherController.getTeachers);

//Get a teacher by ID
router.get('/:id', authMiddleware, teacherController.getTeacherById);

//Update a teacher
router.put('/:id', authMiddleware, upload.single('profileImage'), teacherController.updateTeacher);

//Delete a teacher
router.delete('/:id', authMiddleware, teacherController.deleteTeacher);

module.exports = router;


