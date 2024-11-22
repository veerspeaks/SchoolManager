// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController.cjs');
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const upload = require('../utils/multer.cjs');

router.post('/', authMiddleware, upload.single('profileImage'), studentController.createStudent);
router.get('/', authMiddleware, studentController.getStudents);
router.get('/:id', authMiddleware, studentController.getStudentById);
router.put('/:id', authMiddleware, upload.single('profileImage'), studentController.updateStudent);
router.delete('/:id', authMiddleware, studentController.deleteStudent);

module.exports = router;