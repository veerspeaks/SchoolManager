// routes/classRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController.cjs');
const authMiddleware = require('../middlewares/authMiddleware.cjs');

router.post('/', authMiddleware, classController.createClass);
router.get('/', authMiddleware, classController.getClasses);
router.get('/:id', authMiddleware, classController.getClassById);
router.put('/:id', authMiddleware, classController.updateClass);
router.delete('/:id', authMiddleware, classController.deleteClass);

module.exports = router;