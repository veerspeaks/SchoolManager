// routes/classRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController.cjs');
const authMiddleware = require('../middlewares/authMiddleware.cjs');

//Create a new class
router.post('/', authMiddleware, classController.createClass);

//Get all classes
router.get('/', authMiddleware, classController.getClasses);

//Get a class by ID
router.get('/:id', authMiddleware, classController.getClassById);

//Update a class
router.put('/:id', authMiddleware, classController.updateClass);

//Delete a class
router.delete('/:id', authMiddleware, classController.deleteClass);

module.exports = router;