// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController.cjs');
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const upload = require('../utils/multer.cjs');

router.post('/', authMiddleware, upload.single('profileImage'), teacherController.createTeacher);
router.get('/', authMiddleware, teacherController.getTeachers);
router.get('/:id', authMiddleware, teacherController.getTeacherById);
router.put('/:id', authMiddleware, upload.single('profileImage'), teacherController.updateTeacher);
router.delete('/:id', authMiddleware, teacherController.deleteTeacher);

module.exports = router;


